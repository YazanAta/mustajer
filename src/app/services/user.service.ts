import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fs: AngularFirestore, private auth: AuthService) { }

  addNewUser(id: string | undefined, name: string | null | undefined, email: string | null | undefined, phone: string, address: string) {
    return this.fs.doc(`users/${id}`).set(
      {
        name: name ,
        email: email ,
        phone: phone,
        address: address,
        role: "user" //you can put => name and address by themself because the name of property is the same ass var
      }
    )
  }

  userInfo(uid){
    return this.fs.doc(`users/${uid}`).valueChanges()
  }

  getUsers() {
    return this.fs.collection('users').snapshotChanges();
  }

  updateUserRole(userId: string, role: string) {
    return this.fs.collection('users').doc(userId).update({ role });
  }

  deleteUser(userId: string): Promise<void> {
    return this.fs.collection('users').doc(userId).delete();
  }

}
