import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private as: AuthService, private router: Router, private us: UserService, private renderer: Renderer2){}

  errorMessage: string = ''
  @ViewChild('modalTrigger', { static: true }) modalTrigger: ElementRef | undefined;

  async login(form: any){ //modify any
    let data = form.value
    await this.as.login(data.email, data.password)
    .then(async result => {
      if(result.user?.emailVerified == true){
        this.router.navigate(['/'])
      }else{
        await this.as.logout().then(() => {
          alert("Please verify your email")
          this.router.navigate(['/'])
        })
      }
    })
    .catch(err => {
      this.errorMessage = err
      this.renderer.selectRootElement(this.modalTrigger?.nativeElement).click()
    })
  }

  recoverPassword(form: any){
    this.as.recoverPassword(form.value.email).subscribe(() => {
      console.log("Success");
    })
  }

}
