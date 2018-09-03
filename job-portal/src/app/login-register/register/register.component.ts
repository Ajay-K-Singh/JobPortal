import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'register-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  ngOnInit() {
    this.registerForm = new FormGroup({
      'emailOrUserName': new FormControl(null),
      'password': new FormControl(null),
      'confirmPassword': new FormControl(null)
    })
  }
}