import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat';
import { updateDoc, doc, increment } from "firebase/firestore"; 
import { Observable } from 'rxjs';

interface FeedbackData {
  likes: number;
  name: string;
  feedback: string;
  timestamp: Date;
};

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})


export class AboutComponent implements OnInit{
  
  constructor(private firestore: AngularFirestore) { }
  
  showFeedbackForm = false;

  ngOnInit(): void {
    this.getAllFeedbacks();
  }

  submitFeedback(): void {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const feedback = (document.getElementById('feedback') as HTMLTextAreaElement).value;
  
    this.firestore.collection('feedback').add({
      name: name,
      feedback: feedback,
      timestamp: new Date()
    }).then(() => {
      alert('Feedback submitted successfully');
    }).catch((error) => {
      alert('Error submitting feedback ');
    });
  }

  feedbacks$: Observable<any[]>;

  getAllFeedbacks() {
    this.feedbacks$ = this.firestore.collection('feedback').valueChanges();
  }
}
