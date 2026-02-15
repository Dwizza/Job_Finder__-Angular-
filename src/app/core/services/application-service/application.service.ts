import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from '../../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private baseUrl = 'http://localhost:3001/applications';

  constructor(private http: HttpClient) { }

  getByUserId(user_id: string){
    return this.http.get<Application []>(`${this.baseUrl}?user_id=${user_id}`)
  }

  findOne(userId: number, offerId: string) {
    return this.http.get<Application[]>(`${this.baseUrl}?user_id=${userId}&offer_id=${offerId}`);
  }

  add(app: Application) {
    return this.http.post<Application>(this.baseUrl, app, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  update(id: number, data: Partial<Application>) {
    return this.http.patch<Application>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
