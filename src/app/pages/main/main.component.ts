import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {AuthService} from "../../shared/services/auth.service";
import {DatePipe} from "@angular/common";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {FirebaseAppModule} from "@angular/fire/app";
import * as firebase from 'firebase/compat';
import {UploadService} from "../../shared/services/upload.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // title = new FormControl('');
  // content = new FormControl('');

  form = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });
  dropdown = "";

  myArray: any[] = [];
  resultArr: any[] = [];

  email = "";
  uid = this.authService.getCurrentUser();

  sikeresFeltolt: boolean = false;

  private changeLog: any;

  constructor(private firestore: AngularFirestore, private authService: AuthService, public auth: AngularFireAuth, private upl: UploadService) { }

  deleteItem(title: string) {
    // console.log(title);
    // this.firestore
    //   .collection("recipes", ref => ref.where('title', '==', title))
    //   .doc("title").
    //   .delete().then(a => {
    //     console.log("Recipe deleted successfully", a);
    // }).catch((error) => {
    //   console.log("Can't delete recipe: ", error);
    // });
  }

  // upload service
  submit() {
    this.upl.submit(
      this.form.value.title,
      this.form.value.content,
      this.dropdown,
      this.uid
      )
    this.sikeresFeltolt = this.upl.uploadSucc;
    console.log(this.sikeresFeltolt)
    this.queryData()
  }

  ngOnInit() {
    this.queryData();
  }

  ngOnDestroy() {
    console.log("destroy");
  }

  select(event: any) {
    this.dropdown = event.target.value;
    console.log(this.dropdown)
  }

  queryData() {
    this.uid = this.authService.getCurrentUser();

    this.firestore
      .collection("recipes", ref => ref.where('user', '==', this.uid))
      .get()
      .subscribe((ss) => {
        ss.docs.forEach((doc) => {
          this.myArray.push(doc.data());
        });
      });
    // this.email = this.authService.getCurrentUser();
  }

}
