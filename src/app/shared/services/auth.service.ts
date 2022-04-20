import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email = "";
  uid = "";
  error = "";

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string) {
    // save the email
    this.email = email;
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string) {
    // save the email
    this.email = email;
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }

  getCurrentUser() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        // ...
      } else {
        this.error = "111";
      }
    });
    return this.uid;
  }

}
