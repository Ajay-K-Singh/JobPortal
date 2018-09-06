import { Injectable } from '@angular/core';
import { AuthModel } from '../models/authorization.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    const userData: AuthModel = { 
      email: email,
      password: password
    }
    this.http.post("http://localhost:3000/api/user/signup", userData)
      .subscribe(response => {
        console.log(response);
      })
  }

  logInUser(email: string, password: string) {
    const userData: AuthModel = { 
      email: email,
      password: password
    }
    this.http.post<{token: string}>("http://localhost:3000/api/user/login", userData)
    .subscribe(response => {
      const token = response.token;
      localStorage.setItem('currentUser', token);
    })
  }
}