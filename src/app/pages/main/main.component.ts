import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {AuthService} from "../../shared/services/auth.service";
import {DatePipe} from "@angular/common";

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

  currentDate: Date = new Date();
  dateString: string | null = "";

  constructor(private datePipe: DatePipe, private firestore: AngularFirestore, private authService: AuthService) { }

  submit() {

    this.dateString = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd-hh-mm');

    // if the dropdown menu was untouched pick the first element
    if (this.dropdown == "") {
      this.dropdown = "Előétel";
    }

    this.firestore.collection('recipes').add({
      "title": this.form.value.title,
      "content": this.form.value.content,
      "type": this.dropdown,
      "date": this.dateString,
      "user": this.uid
    })
      .then(res => {
        console.log(res);
        this.form.reset();
      })
      .catch(e => {
        console.log(e);
      })
  }

  ngOnInit(): void {
    this.queryData();
  }

  select(event: any) {
    this.dropdown = event.target.value;
    console.log(this.dropdown)
  }

  queryData() {
    this.uid = this.authService.getCurrentUser();

    // this.firestore.collection("test").where('user', '==', this.uid).get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       // doc.data() is never undefined for query doc snapshots
    //       console.log(doc.id, " => ", doc.data());
    //     });
    //   })
    //   .catch((error) => {
    //     console.log("Error getting documents: ", error);
    //   });

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
