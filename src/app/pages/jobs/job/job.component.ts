import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../core/services/job-service/job.service';
import { Job } from '../../../core/models/job.model';
import { JobCardComponent } from "../../../shared/components/job-card/job-card.component";
import { NgFor, NgIf } from '@angular/common';
import { NavBarComponent } from "../../../shared/components/nav-bar/nav-bar.component";
import { SearchComponent } from "../../../shared/components/search/search.component";
import { debounceTime, distinctUntilChanged, filter, map, Subject, switchMap, tap } from 'rxjs';

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
  skeletonItems = new Array(6); // Show 6 skeleton cards while loading

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.loading = true;
    this.jobService.getJobs().subscribe((jobs) => {
      this.jobs = jobs;
      this.loading = false;
      console.log(jobs);
    });
  }


}
