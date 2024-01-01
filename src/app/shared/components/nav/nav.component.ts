import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private as: AuthService){}

  isOpen: boolean = false;
  isUser: boolean = false

  ngOnInit(): void {
    this.as.user.subscribe(user => {
      if (user) {
        this.isUser = true
        this.as.userId = user.uid         
      }
      else {
        this.isUser = false
        this.as.userId = ''
      }
    })
  }

  toggleNavBar(){
    this.isOpen = !this.isOpen
  }

  logout(){
    this.as.logout().then(() => {
      location.reload();
    })
  }
}
