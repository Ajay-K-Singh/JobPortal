import {ErrorStateMatcher} from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isSubmitted = false;
  invalidControl = false;
  invalidParent = false;
  constructor() {
    this.isSubmitted = false;
    this.invalidControl = false;
    this.invalidParent = false;
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    this.isSubmitted = form && form.submitted;
    this.invalidControl = !!(control && control.invalid && control.parent.dirty);
    this.invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    if (this.isSubmitted) {
      return ((this.invalidControl || this.invalidParent));
    }
    return false;
  }
}