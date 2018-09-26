import { Injectable } from '@angular/core';
import { AuthModel } from '../models/authorization.model';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd, NavigationStart } from '../../../node_modules/@angular/router';
import { UserModel } from '../models/user.model';
import { filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private user: UserModel;
  private userInfoListener = new Subject<any>();
  private authenticationStatusListener = new Subject<any>();
  private isAuthenticated = false;
  private isLoadingListener = new Subject<boolean>();
  private isLoading = false;
  private token: string;
  private tokenTimer: any;
  private didSignUp: boolean = false;
  private didSignUpListener = new Subject<boolean>();
  private mode;
  private modeListener = new Subject<string>();
  private messageObject = {
      message: '',
      type: ''
  }
  private messageObjectListener = new BehaviorSubject<any>(this.messageObject);
  loggedInAs: string;
  previousUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.watchRouteChange();
    this.validateSession();
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

  getMode() {
    return this.mode;
  }

  getModeListener() {
    return this.modeListener.asObservable();
  }

  getUserInfo() {
    return this.user;
  }

  getUserInfoListener() {
    return this.userInfoListener.asObservable();
  }

  watchRouteChange() {
    this.router.events.pipe(
      filter((event:Event) => event instanceof NavigationStart)
    ).subscribe(data => {
      console.log(data);
    })
  }
  
  validateSession() {
    this.setLoadingListener(true);
    this.http.get('https://localhost:3000/api/validate-session')
      .subscribe(data => {
        if ((<any>data).user.isAuthenticated) {
          const expiresInDuration = (<any>data).user.expiresIn;
          const now = new Date();
          this.setUserInfo((<any>data).user.user);
          this.setAuthenticationTimer(expiresInDuration);
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthenticationData((<any>data).user.token, expirationDate);
          this.setLoadingListener(false);
          this.autoAuthenticateUser(this.getAuthenticationData());
        } else {
          this.clearAuthenticationData();
          this.setLoadingListener(false);
        }
      });
  }


  createUser(firstName: string, lastName: string, email: string, password: string) {
    this.setLoadingListener(true);
    const modeValid = this.validateMode();
    if (!modeValid) {
      this.setLoadingListener(false);
      return;
    }
    const userData: AuthModel = { 
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }
    const requestPath = this.mode;
    this.http.post(`https://localhost:3000/api/${requestPath}/signup`, userData)
      .subscribe(response => {
        this.setMessageObject((<any>response).message, 'success');
        this.setSignUpListener(true);
        this.setLoadingListener(false);
      }, error => {
        if (error.error.message) {
          this.setMessageObject(error.error.message, 'error');
          this.setSignUpListener(true);
          this.setLoadingListener(false);
        }
      });
      this.clearMessageObject();
  }

  logInUser(email: string, password: string) {
    this.setLoadingListener(true);
    const modeValid = this.validateMode();
    if (!modeValid) {
      this.setLoadingListener(false);
      return;
    }
    const userData = { 
      email: email,
      password: password
    }
    const requestPath = this.mode;
    this.http.post<{token: string, expiresIn: number}>(`https://localhost:3000/api/${requestPath}/login`, userData)
    .subscribe(response => {
      const token = (<any>response).config.token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthenticationTimer(expiresInDuration);
        this.setLoadingListener(false);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthenticationData(token, expirationDate);
        this.validateSession();
      }
    }, error => {
        if (error.error.message) {
          this.setMessageObject(error.error.message, 'error');
        }
        if (!error.error.hasSignedUp) {
          this.setSignUpListener(false);
        }
        this.setLoadingListener(false);
    });
    this.clearMessageObject();
  }

  logOut() {
    this.setLoadingListener(true);
    this.http.get('https://localhost:3000/logout')
      .subscribe(data => {
        this.clearAuthenticationData();
        this.setAuthenticationListener(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthenticationData();
        this.resetUserInfo();
        this.setLoadingListener(false);
        this.mode = '';
        this.modeListener.next(this.mode);
        window.location.replace('/');
    });

  }

  autoAuthenticateUser(authenticationInfo) {
    if (!authenticationInfo && !this.mode) {
      this.router.navigate(['/']);
      return;
    }
    if (authenticationInfo && authenticationInfo.token) {
      const now = new Date();
      const expiresIn = authenticationInfo.expirationDate.getTime() - now.getTime();
      if (expiresIn > 0) {
      this.token = authenticationInfo.token;
      this.setAuthenticationTimer(expiresIn/1000);
      this.setAuthenticationListener(true);
      if (this.isAuthenticated && !this.previousUrl) {
        this.navigateTo(localStorage.getItem('loggedInAs'));
      }
      if (this.isAuthenticated && this.previousUrl) {
        this.navigateTo(this.previousUrl);
      }
    }
    }
  }

  validateMode() {
    if (!this.mode) {
      this.setMessageObject('Please Select a mode to continue.', 'error');
      this.messageObjectListener.next(this.messageObject);
      return false;
    }
    this.setMessageObject('', ''); 
    this.messageObjectListener.next(this.messageObject);
    return true;
  }

  private navigateTo(route) {
    if (route === 'home') {
      this.router.navigate(['/']);
    } else{
      this.router.navigate([`/${route}`]);
    }
  }

  private setUserInfo(userInfo) {
      const user: UserModel = { 
      email: <string>(userInfo.email),
      firstName:  <string>(userInfo.firstName),
      lastName: <string>(userInfo.lastName),
      image: <string>(userInfo.image),
      id: userInfo._id
    };
    this.user = user;
    this.userInfoListener.next(this.user);
  }

  private resetUserInfo() {
    const user: UserModel = {
      email: '',
      firstName:  '',
      lastName: '',
      image: '',
      id: ''
    };
    this.user = user;
    this.userInfoListener.next(this.user);
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

  private saveAuthenticationData(token: string, expiration: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration.toISOString());
  }

  private clearAuthenticationData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('loggedInAs');
    this.navigateTo('home');
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

  setMode(mode) {
    this.mode = mode;
    localStorage.setItem('loggedInAs', this.mode)
    this.modeListener.next(this.mode);
  }
}