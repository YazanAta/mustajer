import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  constructor(private as: AuthService, private router: Router){}

  @ViewChild('email', { static: true }) email: ElementRef;
  sending: boolean = false

  getLink(){
    this.sending = true;
    this.as.recoverPassword(this.email.nativeElement.value).subscribe(() => {
      this.sending = false;
      alert("Email Has Sent")
    }, err => {
      this.sending = false;
      alert(err)
    })
  }

}
