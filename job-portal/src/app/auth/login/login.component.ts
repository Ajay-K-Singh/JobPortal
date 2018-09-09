import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Output() onLogin: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  ngOnInit() {
    this.loginForm = new FormGroup({
      'emailOrUserName': new FormControl(null),
      'password': new FormControl(null)
    });
  }

  onLoginClick () {
    if (this.loginForm.valid) {
      this.onLogin.emit(this.loginForm);
    }
  }
}