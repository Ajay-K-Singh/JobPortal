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
  constructor(public authenticationService: AuthenticationService ) { }
  
  ngOnInit() {
    this.isLoadingStatus = this.authenticationService.getIsLoading();
    this.isLoadingSub = this.authenticationService.getIsLoadingListener()
      .subscribe(isLoading => {
        this.isLoadingStatus = isLoading;
    });
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
    this.authenticationService.autoAuthenticateUser();
  }

  ngOnDestroy() {
    if(this.isLoadingSub) {
      this.isLoadingSub.unsubscribe();
    }
  }

  private onLoginRequest(event) {
    const email = event.value.emailOrUserName;
    const password = event.value.password;
    this.authenticationService.logInUser(email, password);
  }

  private onSignUpRequest(event) {
    const email = event.value.emailOrUserName;
    const password = event.value.password;
    this.authenticationService.createUser(email, password);
  }

}