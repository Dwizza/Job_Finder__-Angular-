import { Component, ErrorHandler, OnInit } from '@angular/core';
import { JobService } from '../../../core/services/job-service/job.service';
import { Job } from '../../../core/models/job.model';
import { JobCardComponent } from "../../../shared/components/job-card/job-card.component";
import { NgFor, NgIf } from '@angular/common';
import { NavBarComponent } from "../../../shared/components/nav-bar/nav-bar.component";
import { SearchComponent } from "../../../shared/components/search/search.component";
import { ApplicationService } from '../../../core/services/application-service/application.service';
import { Router } from '@angular/router';
import { Application } from '../../../core/models/application.model';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [JobCardComponent, NgFor, NgIf, NavBarComponent, SearchComponent],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent implements OnInit {
  jobs: Job[] = [];
  loading = false;
  errorMsg = '';
  skeletonItems = new Array(6);
  resetKey = 0;

  page = 1;
  pageSize = 9;
  canNext = true;

  lastSearch: { keyword: string; location: string } | null = null;

  constructor(private jobService: JobService, 
    private appService: ApplicationService, 
    private router: Router) { }

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(p: number) {
    if (p < 1) return;

    this.page = p;
    this.loading = true;
    this.errorMsg = '';

    const req$ = this.lastSearch
      ? this.jobService.searchJob(this.page, this.lastSearch.keyword, this.lastSearch.location, this.pageSize)
      : this.jobService.getJobs(this.page, this.pageSize);

    req$.subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        this.canNext = (jobs.length === this.pageSize);
        console.log(jobs);
        
        this.loading = false;
      },
      error: () => {
        this.jobs = [];
        this.errorMsg = "Something went wrong";
        this.loading = false;
      }
    });
  }

  onSearch(searchData: { keyword: string, location: string }) {
    this.errorMsg = '';

    if (!searchData.keyword) {
      this.jobs = [];
      this.errorMsg = "enter the keyword";
      return;
    }

    this.lastSearch = { keyword: searchData.keyword, location: searchData.location };

    this.loadPage(1);
  }

  prev() {
    if (this.page > 1) this.loadPage(this.page - 1);
  }

  next() {
    if (this.canNext) this.loadPage(this.page + 1);
  }

  resetToJobs() {
    this.lastSearch = null;
    this.errorMsg = '';
    this.resetKey++;
    this.loadPage(1);
  }

  getCurrentUser() {
    const raw = localStorage.getItem('user');    
    return raw ? JSON.parse(raw) : null;
  }

  onApply(job: any) {
    const user = this.getCurrentUser();
    if (!user) {
      this.errorMsg = 'Please login to apply.';
      this.router.navigate(['/login'])
      return;
    }

    const offerId = String(job.id);

    this.appService.findOne(user.id, offerId).subscribe({
      next: (existing) => {
        if (existing.length > 0) {
          this.errorMsg = 'You already applied to this job.';
          return;
        }
          
        const payload: Application = {
          user_id: user.id,
          offer_id: offerId,
          api_source: 'adzuna',
          title: job.title,
          company: job.company?.display_name ?? '',
          location: job.location?.display_name ?? '',
          url: job.redirect_url,
          status: 'en_attente',
          notes: '',
          date_added: new Date().toISOString()
        };

        this.appService.add(payload).subscribe({
          next: () => {
            this.router.navigate(['/applications']);
          },
          error: () => {
            this.errorMsg = 'Failed to apply.';
          }
        });
      },
      error: () => this.errorMsg = 'Failed to apply.'
    });
  }
}

