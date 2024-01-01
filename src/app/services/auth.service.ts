import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from 'firebase/auth'
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User | null>
  userId: string = ''
  
  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.user
  }

  signup(email: string, password: string){
    return this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  login(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  logout(){
    return this.afAuth.signOut()
  }

  deleteAccount(){
    this.afAuth.currentUser.then(user => {
      user?.delete()
    })
  }

  recoverPassword(email: string): Observable<void>{
    return from(this.afAuth.sendPasswordResetEmail(email));
  }
}
