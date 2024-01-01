import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { residentialEntity } from '../interfaces/residentialEntity.interface';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private fs: AngularFirestore, private as: AuthService, private storage: AngularFireStorage) { }
  
  async addPost(postInfo: any, image: File, userInfo){
    return new Promise<void>((resolve, reject) => {
      
      const ref = this.storage.ref('posts/' + image.name)

      ref.put(image).then(() => {
        ref.getDownloadURL().subscribe(url => {
          const post = {
            title : postInfo.title,
            residential : postInfo.residential,
            purpose : postInfo.purpose,
            location : postInfo.location,
            region: "",
            area : postInfo.area,
            bathrooms : postInfo.bathNum,
            bedrooms : postInfo.bedNum,
            description : postInfo.description,
            photoUrl : url,
            owner: userInfo,
            status: 'pending'
          };
          // Check if postInfo.region exists before adding it to the document
          if (postInfo.location == 'amman') {
            post.region = postInfo.region;
          }
          this.fs.collection(`users/${this.as.userId}/posts`).add(post).then( () => resolve());
        })
      })

    })

  }

  getMyPosts(){
    return this.fs.collection(`users/${this.as.userId}/posts`).snapshotChanges()
  }

  resultPosts(residential, purpose, location){
    let resultPost: residentialEntity[] = []
    this.fs.collectionGroup(`posts`).valueChanges().subscribe((data) => {
      // Iterate through the data
      data.forEach((post: residentialEntity) => {
      // Check if any of the conditions match
      if (
        (post.residential === residential) &&
        (post.purpose === purpose) &&
        (post.location === location)
      ) {
        resultPost.push(post);
      }
      });
    })
    return(resultPost)
  }

  getAllPosts(): Observable<any[]> {
    return this.fs.collectionGroup('posts', ref => ref.where('status', '==', 'approved')).snapshotChanges();
  }


  deletePost(postId: string) {
    this.fs.doc(`users/${this.as.userId}/posts/${postId}`).delete().then(() => {
      // delete the image from storage
      this.storage.ref('posts/' + postId).delete();

      alert('Post deleted successfully!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }

  addToWishlist(post: any) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.some((p: any) => p.title === post.title && p.owner.name === post.owner.name)) {
      wishlist.push(post);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      window.alert('Post added to wishlist');
    } else {
      window.alert('Post already in wishlist');
    }
  }


  removeFromWishlist(post: any) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.findIndex((p: any) => p.id === post.id);
    if (index !== -1) {
      wishlist.splice(index, 1);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    window.location.reload();
  }

  getPendingPosts(): Observable<any[]> {
    return this.fs.collectionGroup('posts', ref => ref.where('status', '==', 'pending')).snapshotChanges()
  }

  approvePost(postId: string, userId: string): Promise<void> {
    return this.fs.collection('users').doc(userId).collection('posts').doc(postId).update({
      status: 'approved'
    });
  }
  
  denyPost(postId: string, userId: string): Promise<void> {
    return this.fs.collection('users').doc(userId).collection('posts').doc(postId).update({
      status: 'denied'
    });
  }

}
