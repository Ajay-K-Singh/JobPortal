import { Injectable } from '@angular/core';
import { AuthModel } from '../models/authorization.model';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private authenticationStatusListener = new Subject<any>();
  private isAuthenticated = false;
  private message: string; 
  private isLoadingListener = new Subject<boolean>();
  private isLoading = false;
  private token: string;
  private tokenTimer: any;
  private didSignUp: boolean = false;
  private didSignUpListener = new Subject<boolean>();
  private messageObject = {
      message: 'Hello, Welcome to next gen Job Portal!',
      type: 'success'
  }
  private messageObjectListener = new BehaviorSubject<any>(this.messageObject);
  loggedInAs: string;
  navigatedFrom: string;
  previousUrl: string;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
        this.navigatedFrom = params.route;
        this.autoAuthenticateUser();
    });
  }

  getIsLoading() {
    return this.isLoading;
  }

  getIsLoadingListener() {
    return this.isLoadingListener.asObservable();
  }
  getAuth() {
    return this.isAuthenticated;
  }

  getAuthenticationStatusListener() {
    return this.authenticationStatusListener.asObservable();
  }

  getDidSignUp() {
    return this.didSignUp;
  }
  
  getDidSignUpListener() {
    return this.didSignUpListener.asObservable();
  }

  getMessageObject() {
    return this.messageObject;
  }

  getMessageObjectListener() {
    return this.messageObjectListener.asObservable();
  }


  createUser(email: string, password: string) {
    const userData: AuthModel = { 
      email: email,
      password: password
    }
    this.isLoading = true;
    this.isLoadingListener.next(true);
    const requestPath = this.getModes()[`${this.navigatedFrom}`];
    this.http.post(`http://localhost:3000/api/${requestPath}/signup`, userData)
      .subscribe(response => {
        console.log(response);
        this.messageObject.message = (<any>response).message;
        this.messageObject.type = 'success';
        this.messageObjectListener.next(this.messageObject);
        this.didSignUp = true;
        this.didSignUpListener.next(true);
      }, error => {
        this.isLoading = false;
        this.isLoadingListener.next(false);
      });
      this.messageObject.message = '';
      this.messageObject.type = '';
      this.messageObjectListener.next(this.messageObject);
      this.didSignUp = false;
      this.didSignUpListener.next(false);
  }

  autoAuthenticateUser() {
    const authenticationInfo = this.getAuthenticationData();
    if (!authenticationInfo && !this.navigatedFrom) {
      this.router.navigate(['/']);
      return;
    }
    if (authenticationInfo) {
      const now = new Date();
      const expiresIn = authenticationInfo.expirationDate.getTime() - now.getTime();
      if (expiresIn > 0) {
      this.token = authenticationInfo.token;
      this.isAuthenticated = true;
      this.setAuthenticationTimer(expiresIn/1000);
      this.authenticationStatusListener.next(true);
      if (this.isAuthenticated) {
        this.router.navigate([`/${localStorage.getItem('loggedInAs')}`]);
      }
      if (this.navigatedFrom) {
        this.router.navigate([`/${this.navigatedFrom}`]);
      }
    }
    }
  }

  logInUser(email: string, password: string) {
    this.isLoading = true;
    this.isLoadingListener.next(true);
    console.log(email, password);
    const userData: AuthModel = { 
      email: email,
      password: password
    }
    const requestPath = this.getModes()[`${this.navigatedFrom}`];
    this.http.post<{token: string, expiresIn: number}>(`http://localhost:3000/api/${requestPath}/login`, userData)
    .subscribe(response => {
      const token = response.token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthenticationTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authenticationStatusListener.next(true);
        this.isLoading = false;
        this.isLoadingListener.next(false);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.SaveAuthenticationData(token, expirationDate);
        this.router.navigate([`/${this.navigatedFrom}`]);
      }
    })
  }

  logOut() {
    this.isLoading = true;
    this.isLoadingListener.next(true);
    this.isAuthenticated = false;
    this.authenticationStatusListener.next(false);
    this.isLoading = false;
    this.isLoadingListener.next(false);
    clearTimeout(this.tokenTimer);
    this.ClearAuthenticationData();
    this.router.navigate([`/`]);
  }

  private SaveAuthenticationData(token: string, expiration: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration.toISOString());
    localStorage.setItem('loggedInAs', `${this.navigatedFrom}`)
  }

  private ClearAuthenticationData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('loggedInAs');
  }

  private getAuthenticationData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return null;
    }
    if (token && expirationDate) {
      return {
        token,
        expirationDate: new Date(expirationDate)
      };
    }
  }

  private setAuthenticationTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }

  getModes() {
    return {
      jobs: 'job-seeker',
      recruiter: 'recruiter'
    }
  }
}