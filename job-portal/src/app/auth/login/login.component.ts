import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomErrorStateMatcher } from '../../material/error-state-matcher';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Output() onLogin: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  matcher = new CustomErrorStateMatcher();
  modeSelected: string = '';
  private modeSubs: Subscription;

  constructor(private formBuilder: FormBuilder, public authenticationService: AuthenticationService) {
    this.createForm();
    this.setModeSubscription();
  }

  ngOnInit() {
  }


  createForm() {
    this.loginForm =  this.formBuilder.group({
      emailOrUserName: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLoginClick () {
    if (this.loginForm.valid) {
      this.onLogin.emit(this.loginForm);
      if (this.modeSelected) {
        this.createForm();
      }
    }
  }

  setModeSubscription() {
    this.modeSelected = this.authenticationService.getMode();
    this.modeSubs = this.authenticationService.getModeListener()
      .subscribe(mode => {
        this.modeSelected = mode;
      }) 
  }
}