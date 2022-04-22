import { Component, OnInit } from '@angular/core';
import {GalleryService} from "../../shared/services/gallery.service";
import {Image} from "../../shared/models/Image";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(private firestore: AngularFirestore) { }

  myArray: any[] = [];

  ngOnInit(): void {
    this.queryData();
  }

  queryData() {
    this.firestore
      .collection("recipes", ref => ref.orderBy("date"))
      .get()
      .subscribe((ss) => {
        ss.docs.forEach((doc) => {
          this.myArray.push(doc.data());
        });
      });
  }

}
