import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseApiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }
  register(payload: User){
    return this.http.get<User[]>(`${this.baseApiUrl}/users?email=${payload.email}`).pipe(
      switchMap(users => {
        if (users.length > 0) {
          throw new Error('Email already exists');
        }
        return this.http.post<User>(`${this.baseApiUrl}/users`, payload);
      }),map(user => {
        this.saveUserToLocalStorage(user);
        return user;
      })
    );
   
  }

  saveUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  login(email: string, password: string) {
    return this.http.get<User[]>(`${this.baseApiUrl}/users?email=${email}&password=${password}`).pipe(
      map(users => {
        if(users.length === 0 ){
          throw new Error('Invalid email or password');
        }
        this.saveUserToLocalStorage(users[0]);
        return users[0];
      })
    )
  }

  
}
