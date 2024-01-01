import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private as: AuthService, private us: UserService){}

  isOpen: boolean = false;
  isUser: boolean = false;
  isAdmin: boolean = false;

  ngOnInit(): void {
    this.as.user.subscribe(user => {
      if (user) {
        this.isUser = true
        this.as.userId = user.uid 
        this.us.userInfo(user.uid).subscribe((data: any) => {data.role == 'admin' ? this.isAdmin = true : this.isAdmin = false})        
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
