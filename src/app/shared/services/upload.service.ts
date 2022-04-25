import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {UploadHelperPipe} from "../pipes/upload-helper.pipe";
import {EmptyTypePipe} from "../pipes/empty-type.pipe";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  uploadSucc: boolean = false;

  private currentDate: Date = new Date();
  private dateString: unknown = "";

  constructor(private emptyPipe: EmptyTypePipe, private datePipe: UploadHelperPipe, private firestore: AngularFirestore) { }

  submit(title: string, content: string, type: string, user: string) {

    // Pipes
    this.dateString = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd-hh-mm');
    this.emptyPipe.transform(type);

    this.firestore.collection('recipes').add({
      "title": title,
      "content": content,
      "type": type,
      "date": this.dateString,
      "user": user
    })
      .then(res => {
        console.log(res);
        //this.form.reset();
      })
      .catch(e => {
        console.log(e);
      })
  }

}
