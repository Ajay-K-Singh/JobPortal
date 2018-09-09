import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'register-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  @Output() private formReady : EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() onSignUp: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  ngOnInit() {
    this.registerForm = new FormGroup({
      'emailOrUserName': new FormControl(null),
      'password': new FormControl(null),
    });
  }

  onSignupClick() {
    if (this.registerForm.valid) {
      this.onSignUp.emit(this.registerForm);
    }
  }
}