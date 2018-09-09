import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomErrorStateMatcher } from '../../material/error-state-matcher';
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
  passwordNotSame: boolean = false;
  constructor(private formBuilder: FormBuilder) {
    this.registerForm =  formBuilder.group({
      emailOrUserName: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, { 
      validator:  this.checkPasswords
    })
  }
  ngOnInit() {
  }

  checkPasswords(group: FormGroup) {
    let password = group.controls.password.value;
    let confirmPassword = group.controls.confirmPassword.value;
    return password === confirmPassword ? null : { notSame: true }
  }

  onSignupClick() {
    if (this.registerForm.valid) {
      this.onSignUp.emit(this.registerForm);
      this.registerForm.reset();
    }
  }
}