import { Component, ElementRef, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { residentialEntity } from 'src/app/interfaces/residentialEntity.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit{
  constructor(private fb: FormBuilder, private ps: PostsService, private us: UserService, private router: Router, private as: AuthService){}
  
  userInfo: any
  ngOnInit(): void {
    const uid = this.as.userId
    this.us.userInfo(uid).subscribe(data => {
      this.userInfo = data as object
    })
  }

  @ViewChild('modal') modal: ElementRef
  @Output() onModalClose = new EventEmitter<boolean>();

  closeModal(){
    this.modal.nativeElement.style.display = 'none'
    this.onModalClose.emit(false)
  }

  postForm = this.fb.group({  
    title: ['', Validators.required], 
    residential: ['', Validators.required],
    purpose: ['', Validators.required],
    location: ['', Validators.required],
    region: ['', (control: AbstractControl) => {
      const location = this.postForm?.get('location').value;
      if (location === 'Amman' && !control.value) {
        return { required: true };
      }
      return null;
    }],
    description: ['', Validators.required],
    bathNum: ['', [Validators.required, Validators.min(1)]],
    bedNum: ['', [Validators.required, Validators.min(1)]],
    area: ['', [Validators.required, Validators.min(1)]],
    photoFile: ['', Validators.required]
  })

  @ViewChild('image') image: ElementRef

  uploadPost(form: any){
    
    let image = (this.image.nativeElement as HTMLInputElement).files[0]
    this.router.navigate(['/payment'], { state: { formData: form.value, image: image, userInfo: this.userInfo } })
    
  }

}
