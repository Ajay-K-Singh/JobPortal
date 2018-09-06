import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthorizationComponent implements OnInit {
  constructor(public authenticationService: AuthenticationService ) { }

  ngOnInit() {
  
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