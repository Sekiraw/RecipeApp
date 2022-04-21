import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {AuthService} from "../../shared/services/auth.service";

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

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  submit() {
    if (this.dropdown == "") {
      this.dropdown = "Előétel";
    }
    this.firestore.collection('recipes').add({
      "title": this.form.value.title,
      "content": this.form.value.content,
      "type": this.dropdown,
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
      .collection("recipes", ref => ref.where('user', '==', this.uid)).get().subscribe(a => {
        console.log(a.size + " <- size");
        this.myArray.push(a);
        console.log(this.myArray);
    }, error => {
        console.log(error);
    });


    // this.email = this.authService.getCurrentUser();
  }

}
