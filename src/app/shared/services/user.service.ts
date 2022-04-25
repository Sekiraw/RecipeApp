import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }

  create(user: User) {
    return this.afs.collection<User>('Users').doc(user.id).set(user);
  }

  getAll() {

  }

  update() {

  }

  delete() {

  }
}
