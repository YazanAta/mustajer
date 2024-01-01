import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit {
  postId: string;
  userEmail: string;
  post: any;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.userEmail = this.route.snapshot.paramMap.get('userId');
  
    this.firestore.collection('users', ref => ref.where('email', '==', this.userEmail))
      .get()
      .subscribe(userSnapshot => {
        const userId = userSnapshot.docs[0].id;
        this.firestore.collection('users').doc(userId).collection('posts').doc(this.postId).valueChanges()
          .subscribe(post => {
            this.post = post;
          });
      });
  }

  shareFacebook() {
    const url = window.location.href; // Get the current page URL
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookShareUrl, '_blank'); // Open the Facebook share dialog in a new window
  }
  
  shareWhatsapp() {
    const url = window.location.href; // Get the current page URL
    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
    window.open(whatsappShareUrl, '_blank'); // Open WhatsApp with a pre-filled message containing the page link
  }

  shareTwitter() {
    const url = window.location.href; // Get the current page URL
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
    window.open(twitterShareUrl, '_blank'); // Open the Twitter share dialog in a new window
  }
}