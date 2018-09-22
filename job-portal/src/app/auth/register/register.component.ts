import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomErrorStateMatcher } from '../../material/error-state-matcher';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'register-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  @Output() private formReady : EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() onSignUp: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  matcher = new CustomErrorStateMatcher();
  modeSelected: string = '';
  private modeSubs: Subscription;
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    this.createForm();
    this.setModeSubscription();
  }
  ngOnInit() {
  }

  createForm() {
    this.registerForm =  this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailOrUserName: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, { 
      validator:  this.checkPasswords
    })
  }

  checkPasswords(group: FormGroup) {
    let password = group.controls.password.value;
    let confirmPassword = group.controls.confirmPassword.value;
    return password === confirmPassword ? null : { notSame: true }
  }

  onSignupClick() {
    if (this.registerForm.valid) {
      this.onSignUp.emit(this.registerForm);
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