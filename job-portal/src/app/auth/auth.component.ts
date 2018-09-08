import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  constructor(public authenticationService: AuthenticationService ) { }
  
  ngOnInit() {
    this.isLoadingStatus = this.authenticationService.getIsLoading();
    this.isLoadingSub = this.authenticationService.getIsLoadingListener()
      .subscribe(isLoading => {
        this.isLoadingStatus = isLoading;
    });
    this.authenticationService.autoAuthenticateUser();
  }

  ngOnDestroy() {
    if(this.isLoadingSub) {
      this.isLoadingSub.unsubscribe();
    }
  }

  onSubmit() {
    console.log('Yes');
  }

  private onLoginRequest(event) {
    this.authenticationService.logInUser(event.value.emailOrUserName, event.value.password);
  }

  private onSignUpRequest(event) {
    this.authenticationService.createUser(event.value.emailOrUserName, event.value.password);
  }

}