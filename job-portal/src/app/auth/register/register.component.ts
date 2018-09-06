import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'register-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  @Output() onSignUp: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  ngOnInit() {
    this.registerForm = new FormGroup({
      'emailOrUserName': new FormControl(null, Validators.email),
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null, Validators.required)
    })
  }

  onSignupClick() {
    if (this.registerForm.valid) {
      this.onSignUp.emit(this.registerForm);
    }
  }
}