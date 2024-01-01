import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { residentialEntity } from 'src/app/interfaces/residentialEntity.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  searchForm: FormGroup;
  userInfo: User;

  constructor(private fb: FormBuilder, private ps: PostsService, private as: AuthService, private us: UserService, private router: Router) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      residential: [''],
      purpose: [''],
      location: ['']
    });
    this.as.user.pipe(switchMap((user) => this.us.userInfo(user?.uid))).subscribe((data) => {
      this.userInfo = data;
    });
  }

  resultPosts: residentialEntity[] = []
  showResults: boolean = false

  search(){
    this.searchForm.value.residential
    this.resultPosts =  this.ps.resultPosts(this.searchForm.value.residential,this.searchForm.value.purpose,this.searchForm.value.location)
    this.showResults = true 
    console.log(this.resultPosts);
    
  }

  openWhatsapp(owner, postTitle){
    console.log(owner.name, owner.phone, postTitle);
    
    const message = `Hello ${owner.name}, I Have a question on this ${postTitle}`
    const whatsappUrl = `https://wa.me/${owner.phone}/?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  }

  getAllPosts(){
    this.ps.getAllPosts().subscribe((data) => {
      this.resultPosts =  data.map((element) => {
        return{
          id: element.payload.doc.id,
          ...element.payload.doc.data() as object
        }
      })
    })
    this.showResults = true
  }

  addToWishlist(post: any) {
    this.ps.addToWishlist(post);
  }

  goToPostInfo(postId: string, userId:string): void {
    this.router.navigate(['/post-info', postId, userId]);
  }

}
