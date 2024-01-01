import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit{

  constructor(private ps: PostsService) { }

  wishlist: any[] = [];

  ngOnInit() {
    this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  }


  openWhatsapp(owner, postTitle){
    console.log(owner.name, owner.phone, postTitle);
    
    const message = `Hello ${owner.name}, I Have a question on this ${postTitle}`
    const whatsappUrl = `https://wa.me/${owner.phone}/?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  }

  removeFromWishlist(post: any) {
    this.ps.removeFromWishlist(post);
  }


}
