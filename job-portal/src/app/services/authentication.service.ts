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
      message: '',
      type: ''
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
    this.setLoadingListener(true);
    const requestPath = this.getModes()[`${this.navigatedFrom}`];
    this.http.post(`http://localhost:3000/api/${requestPath}/signup`, userData)
      .subscribe(response => {
        this.setMessageObject((<any>response).message, 'success');
        this.setSignUpListener(true);
        this.setLoadingListener(false);
      }, error => {
        if (error.message) {
          this.setMessageObject(error.message, 'error');
        }
      });
      this.clearMessageObject();
      this.setSignUpListener(false);
  }

  logInUser(email: string, password: string) {
    this.setLoadingListener(true);
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
        this.setAuthenticationListener(true);
        this.setLoadingListener(false);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.SaveAuthenticationData(token, expirationDate);
        this.navigateTo(this.navigatedFrom);
      }
    }, error => {
        if (error.message) {
          this.setMessageObject(error.message, 'error');
        }
        this.setMessageObject(error.error.message, 'error');
        if (!error.hasSignedUp) {
          this.setSignUpListener(false);
        }
        this.setLoadingListener(false);
    });
    this.clearMessageObject();
  }

  logOut() {
    this.setLoadingListener(true);
    this.setAuthenticationListener(false);
    clearTimeout(this.tokenTimer);
    this.ClearAuthenticationData();
    this.setLoadingListener(false);
    this.navigateTo('home');
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
      this.setAuthenticationTimer(expiresIn/1000);
      this.setAuthenticationListener(true);
      if (this.isAuthenticated) {
        this.navigateTo(localStorage.getItem('loggedInAs'));
        }
      }
    }
  }

  private navigateTo(route) {
    if (route === 'home') {
      this.router.navigate(['/']);
    } else{
      this.router.navigate([`/${route}`]);
    }
  }

  private setMessageObject(message, type) {
    this.messageObject.message = message;
    this.messageObject.type = type;
    this.messageObjectListener.next(this.messageObject);
  }

  private clearMessageObject() {
    this.messageObject.message = '';
    this.messageObject.type = '';
    this.messageObjectListener.next(this.messageObject);
  }

  private setSignUpListener(didSignUp) {
    this.didSignUp = didSignUp;
    this.didSignUpListener.next(didSignUp);
  }

  private setAuthenticationListener(isAuthenticated) {
    this.isAuthenticated = isAuthenticated;
    this.authenticationStatusListener.next(isAuthenticated);
  }

  private setLoadingListener(isLoading) {
    this.isLoading = isLoading;
    this.isLoadingListener.next(isLoading);
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