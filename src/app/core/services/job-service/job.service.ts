import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '../../models/job.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  getJobs(){
    return this.http.get<Job[]>('https://www.themuse.com/api/public/jobs?page=0').pipe(
      map((response: any) => response.results)
    );
  }

}
