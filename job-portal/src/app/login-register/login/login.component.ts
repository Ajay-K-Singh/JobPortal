import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup
  ngOnInit() {
    this.loginForm = new FormGroup({
      'emailOrUserName': new FormControl(null),
      'password': new FormControl(null)
    })
  }
}