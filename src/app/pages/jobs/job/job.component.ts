import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../core/services/job-service/job.service';
import { Job } from '../../../core/models/job.model';
import { JobCardComponent } from "../../../shared/components/job-card/job-card.component";
import { NgFor } from '@angular/common';
import { NavBarComponent } from "../../../shared/components/nav-bar/nav-bar.component";
import { SearchComponent } from "../../../shared/components/search/search.component";

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [JobCardComponent, NgFor, NavBarComponent, SearchComponent],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe((jobs) => {
      this.jobs = jobs;
    });
  }
}
