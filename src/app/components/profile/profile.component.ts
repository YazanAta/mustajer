import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { AddPostComponent } from '../add-post/add-post.component';
import { PostsService } from 'src/app/services/posts.service';
import { residentialEntity } from 'src/app/interfaces/residentialEntity.interface';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from 'src/app/services/user.service';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy{

  constructor(private as: AuthService, private ps: PostsService, private us: UserService){}

  currentUser: User;
  
  //----modal----//
  @ViewChild(AddPostComponent) childComponent: AddPostComponent;
  isModalOpen : boolean = false;

  openModal(){
    this.childComponent.modal.nativeElement.style.display = 'block'
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false
  }

  //----modal end --//

  myPosts: residentialEntity[] = [];
  postsObservable: Subscription;

  getMyPosts(){
    this.postsObservable = this.ps.getMyPosts().subscribe((data) => {
      this.myPosts =  data.map((element) => {
        return{
          id: element.payload.doc.id,
          ...element.payload.doc.data() as object
        }
      })
    })
  }

  ngOnInit(): void {
    const uid = this.as.userId;
    this.us.userInfo(uid).subscribe((data => {
      this.currentUser = data
    }))
    this.getMyPosts()    
  }

  ngOnDestroy(): void {
    this.postsObservable.unsubscribe
  }

  postToDelete: any;
  openDeleteModal(post: any){
    this.postToDelete = post;
  }

  deletePost(){
    this.ps.deletePost(this.postToDelete.id);
  }


}
