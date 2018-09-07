import { Injectable } from '@angular/core';
import { AuthModel } from '../models/authorization.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private authenticationStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  navigatedFrom: string;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,) {
    this.route.queryParams.subscribe(params => {
      this.navigatedFrom = params.route;
    });
    if (localStorage.getItem('currentUser')) {
      this.authenticationStatusListener.next(true);
      this.isAuthenticated = true;
      if (this.navigatedFrom) {
        this.router.navigate([`/${this.navigatedFrom}`]);
      }
    }
  }

  getAuth() {
    return this.isAuthenticated;
  }

  getAuthenticationStatusListener() {
    return this.authenticationStatusListener.asObservable();
  }
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
      if (token) {
        localStorage.setItem('currentUser', token);
        this.isAuthenticated = true;
        this.authenticationStatusListener.next(true);
        this.router.navigate([`/${this.navigatedFrom}`]);
      }
    })
  }

  logOut() {
    localStorage.setItem('currentUser', null);
    this.isAuthenticated = false;
    this.authenticationStatusListener.next(false);
    this.router.navigate([`/`]);
  }
}