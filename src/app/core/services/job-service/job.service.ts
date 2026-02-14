import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '../../models/job.model';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  getJobs() {
    return this.http.get<Job[]>(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${environment.appId}&app_key=${environment.appKey}&results_per_page=9`).pipe(
      map((response: any) => response.results)
    );
  }

  searchJob(keyword: string, location: string) {
    return this.http.get<Job[]>(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${environment.appId}&app_key=${environment.appKey}&what=${keyword}&where=${location}`).pipe(
      map((res: any) => res.results),
      map((jobs: Job[]) => {
        const k = keyword.toLowerCase();
        return jobs.filter(j =>
          ((j.title) + '').toLowerCase().includes(k)
        );
      })
    );
  }

}
