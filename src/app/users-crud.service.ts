import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class UsersCrudService {

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  async deleteUser(uid: string): Promise<void> {
    const user = firebase.auth().currentUser;
    if (user) {
      await user.delete();
    } else {
      throw new Error('User not authenticated or does not exist.');
    }
  }
  async getUserIdByEmail(email: string): Promise<string | null> {
    const snapshot = await this.firestore.collection('users').ref
      .where('email', '==', email)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const userId = snapshot.docs[0].id;
    return userId;
  }
}
