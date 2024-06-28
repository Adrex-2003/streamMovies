import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutentService {
  private clickLogin = new BehaviorSubject<boolean>(false);
  display$ = this.clickLogin.asObservable();

  displayLogin(display: boolean){
    this.clickLogin.next(display);
  }
  constructor(private firestore: AngularFirestore) {}

  getUsers(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges();
  }
}
