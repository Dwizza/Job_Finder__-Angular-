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

  getJobs(page: number, resultsPerPage: number = 9) {
    return this.http
      .get<any>(`https://api.adzuna.com/v1/api/jobs/us/search/${page}?app_id=${environment.appId}&app_key=${environment.appKey}&results_per_page=${resultsPerPage}&sort_by=date`)
      .pipe(
        map((response: any) => response.results as Job[])
      );
  }

  searchJob(keyword: string, location: string,resultsPerPage: number = 9) {
    return this.http.get<any>(
      `https://api.adzuna.com/v1/api/jobs/us/search?app_id=${environment.appId}&app_key=${environment.appKey}&results_per_page=${resultsPerPage}&what=${keyword}&where=${location}&sort_by=date`
    ).pipe(
      map((res: any) => res.results),
      map((jobs: Job[]) => {
        const k = keyword.toLowerCase();
        return jobs.filter(j => ((j.title) + '').toLowerCase().includes(k));
      })
    );
  }

}
