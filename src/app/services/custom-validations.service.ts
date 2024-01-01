import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationsService {

  constructor() { }

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
          return true;
      } else {
        confirmPasswordControl.setErrors(null);
          return null;
      }
    };
  }

  //patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  //  return (control: AbstractControl): { [key: string]: any } => {
  //    if (!control.value) {
  //      // if the control value is empty return no error.
  //      return null;
  //    }
//
  //    // test the value of the control against the regexp supplied.
  //    const valid = regex.test(control.value);
//
  //    // if true, return no error, otherwise return the error object passed in the second parameter.
  //    return valid ? null : error;
  //  };
  //}

}
