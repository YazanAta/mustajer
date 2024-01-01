import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private as: AuthService, private router: Router, private us: UserService, private renderer: Renderer2){}

  loader = true
  showPage = false
  totalCount = 20

  errorMessage: string = ''
  @ViewChild('modalTrigger', { static: true }) modalTrigger: ElementRef | undefined;

  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false
      this.showPage = true
    }, 1000)
  }

  login(form: any){ //modify any
    let data = form.value
    this.as.login(data.email, data.password)
    .then(result => {
      if(result.user?.emailVerified == true){
        this.router.navigate(['/'])
      }else{
        this.as.logout().then(() => {
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

  loginWithGoogle(){
    this.as.GoogleAuth()
    .then((result) => {
      this.us.addNewUser(result.user?.uid, result.user?.displayName, result.user?.email).then( () => {
        this.router.navigate(['/'])
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  recoverPassword(form: any){
    this.as.recoverPassword(form.value.email).subscribe(() => {
      console.log("Success");
    })
  }

}
