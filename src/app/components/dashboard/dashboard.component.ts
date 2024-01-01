import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  pendingPosts = [];
  users = [];
  roles = ['admin', 'user']; // Define the roles here

  constructor(private postsService: PostsService, private us: UserService) { }

  ngOnInit(): void {
    this.fetchPendingPosts();
    this.fetchUsers();
  }

  fetchPendingPosts(): void {
    this.postsService.getPendingPosts().subscribe(posts => {
      this.pendingPosts = posts.map(post => {
        const data = post.payload.doc.data();
        const id = post.payload.doc.id;
        const userId = post.payload.doc.ref.parent.parent.id; // Get the user id from the parent document
        return { id, ...data, userId } as Object; // Include the user id in the post object
      });
    });
  }

  approvePost(postId: string, userId): void {
    this.postsService.approvePost(postId, userId).then(() => {
      this.fetchPendingPosts();
    }).then(() => {
      console.log('Post approved successfully!')
    })
  }
  
  denyPost(postId: string, userId): void {
    this.postsService.denyPost(postId, userId).then(() => {
      this.fetchPendingPosts();
    }).then(() => {
      console.log('Post Denied successfully!')
    });
  }

  openWhatsapp(owner, postTitle){
    console.log(owner.name, owner.phone, postTitle);
    
    const message = `Hello ${owner.name}, I Have a question on this ${postTitle}`
    const whatsappUrl = `https://wa.me/${owner.phone}/?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  }

  fetchUsers(): void {
    this.us.getUsers().subscribe(users => {
      this.users = users.map(user => {
        const data = user.payload.doc.data();
        const id = user.payload.doc.id;
        return { id, ...data as Object};
      });
    });
  }

  updateUserRole(userId: string, role: string): void {
    this.us.updateUserRole(userId, role).then(() => {
      this.fetchUsers(); // Refresh the users list
    });
  }
  deleteUser(userId: string): void {
    this.us.deleteUser(userId).then(() => {
      this.fetchUsers(); // Refresh the users list
    });
  }
}
