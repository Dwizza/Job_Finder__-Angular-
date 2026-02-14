import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserLogin } from '../../models/user.model';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseApiUrl = 'http://localhost:3001';
  user: User | null = null;

  constructor(private http: HttpClient) { }
  register(payload: User) {
    return this.http.get<User[]>(`${this.baseApiUrl}/users?email=${payload.email}`).pipe(
      switchMap(users => {
        if (users.length > 0) {
          throw new Error('Email already exists');
        }
        return this.http.post<User>(`${this.baseApiUrl}/users`, payload);
      }), map(user => {
        return user;
      })
    );

  }

  login(payload: UserLogin) {
    return this.http.get<User[]>(`${this.baseApiUrl}/users?email=${payload.email}&password=${payload.password}`).pipe(
      map(users => {
        if (users.length === 0) {
          throw new Error('Invalid email or password');
        }
        const user = users[0];

        const { password, ...safeUser } = user as any;
        this.saveUserToLocalStorage(safeUser);
        return safeUser;
      })
    )
  }

  saveUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  editProfile(payload: User) {
    return this.http.patch<User>(`${this.baseApiUrl}/users/${payload.id}`, payload).pipe(
      map(user => {
        this.saveUserToLocalStorage(user);
        return user;
      })
    )
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}
