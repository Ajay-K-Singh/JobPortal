import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomErrorStateMatcher } from '../../material/error-state-matcher';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Output() onLogin: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  matcher = new CustomErrorStateMatcher();
  constructor(private formBuilder: FormBuilder) {
    this.createForm();
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
      this.createForm();
    }
  }
}