import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  title = new FormControl('');
  content = new FormControl('');

  myArray: any[] = [];

  email = "";
  uid = "";

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  submit() {

  }

  ngOnInit(): void {
    this.firestore
      .collection("test")
      .get()
      .subscribe((ss) => {
        ss.docs.forEach((doc) => {
          this.myArray.push(doc.data());
          console.log(this.myArray);
        });
      });


    // this.email = this.authService.getCurrentUser();
    this.uid = this.authService.getCurrentUser();
  }

}
