import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{

  constructor(private ps: PostsService, private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {formData: any, image: any, userInfo: any};

    this.formData = state.formData;
    this.image = state.image;
    this.userInfo = state.userInfo;
  }

  formData: any;
  image: any;
  userInfo: any;

  ngOnInit(): void {
    console.log(this.formData);
  }

  addPost(){
    // After payment is successful, call addPost
    this.ps.addPost(this.formData, this.image, this.userInfo).then(() => {
      alert('Your Post Uploaded Successfully, Our Team Will Talk To You Soon..');
      this.router.navigate(['/profile']);
    }).catch((error) => {
      // Handle error
    });
  }
  


  

  

}
