import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  isLoadingStatus = false;
  private isLoadingSub: Subscription;
  selected = new FormControl(0);
  didSignUp: boolean = false;
  private didSignUpSub: Subscription;
  mode: string;
  userIsAuthenticated = false;
  private authenticationSub: Subscription;
  constructor(public authenticationService: AuthenticationService ) { 
  }
  
  ngOnInit() {
    this.setIsUserAuthenticated();
    this.setLoadingSubs();
    this.setDidSignUpSubscription();
  }

  setIsUserAuthenticated() {
    this.userIsAuthenticated = this.authenticationService.getAuth();
    this.authenticationSub = this.authenticationService.getAuthenticationStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        if (this.userIsAuthenticated) {
          this.authenticationService.loadHomePage();
        }
      });
  }

  setLoadingSubs() {
    this.isLoadingStatus = this.authenticationService.getIsLoading();
    this.isLoadingSub = this.authenticationService.getIsLoadingListener()
      .subscribe(isLoading => {
        this.isLoadingStatus = isLoading;
    });
  }

  setDidSignUpSubscription() {
    this.didSignUp = this.authenticationService.getDidSignUp();
    this.didSignUpSub = this.authenticationService.getDidSignUpListener()
      .subscribe(didSignUp => {
        this.didSignUp = didSignUp;
        if (this.didSignUp) {
          this.selected.setValue(0);
        }
        if (!this.didSignUp) {
          this.selected.setValue(1);
        }
    });
  }

  setMode(mode) {
    this.mode = mode;
    this.authenticationService.setMode(mode);
  }

  private onLoginRequest(event) {
    const email = event.value.emailOrUserName;
    const password = event.value.password;
    this.authenticationService.logInUser(email, password);
  }

  private onSignUpRequest(event) {
    const firstName = event.value.firstName;
    const lastName = event.value.lastName;
    const email = event.value.emailOrUserName;
    const password = event.value.password;
    this.authenticationService.createUser(firstName, lastName,email, password);
  }

  ngOnDestroy() {
    if(this.isLoadingSub) {
      this.isLoadingSub.unsubscribe();
    }
  }

}