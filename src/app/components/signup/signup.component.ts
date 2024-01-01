import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user.interface';
import { CustomValidationsService } from 'src/app/services/custom-validations.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private as: AuthService, private us: UserService, private router: Router, private fb: FormBuilder, private customValidators: CustomValidationsService){}


  //validations
  userForm = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.compose([
      Validators.required, 
      Validators.email
    ])],
    password: ['', Validators.compose([
      Validators.minLength(8),
      Validators.required
    ])],
    confirmPassword: ['', Validators.compose([
      Validators.minLength(8),
      Validators.required
    ])],

  },
  {
    validators: this.customValidators.passwordMatchValidator("password", "confirmPassword")
  });


  errorMessage: string = '';

  signup(form: any ){ //modify any
    let data: User = form.value;
    this.as.signup(data.email, data.password)
    .then(result => {
      this.errorMessage = ''
      this.us.addNewUser(result.user?.uid, data.name, data.email).then(() => {
        result.user?.updateProfile({
          displayName: data.name
        })
        this.as.logout();
        result.user?.sendEmailVerification();
        alert("Open Your Email To Verify Your Account");
        this.router.navigate(['/login'])
      })
    })
    .catch(error => {
      this.errorMessage = error.message
    }
    )
  }

}
