import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';
import { UserCredential, sendPasswordResetEmail, User, onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userEmail: string | null = null;
  userName: string | null = null;

  constructor(private auth: Auth) {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userEmail = user.email;
      } else {
        this.userEmail = null;
      }
    });
  }

  registerWithEmail(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  loginWithEmail(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  getCurrentUser(): Observable<User | null> {
    return authState(this.auth);
  }

  resetPassword(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  getCurrentUserEmail(): string | null {
    return this.userEmail;
  }

  isAuthenticated(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      map(user => !!user)
    );
  }
  signInWithGoogle(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }
}
