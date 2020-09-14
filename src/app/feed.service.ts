import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private db: AngularFireDatabase) {
  }

  getFeeds() {
    return this.db.list('feeds').valueChanges();
  }

  addPost(content){
    const currentDate = new Date();
    const cValue = formatDate(currentDate, 'dd-MM-yyyy', 'en-US');
    const itemRef = this.db.list('feeds');
    const number = Math.random();

    itemRef.push({
      "id": number,
      "author": "admin" + number,
      "content": content,
      "likes": 0,
      "created": cValue
  });
  }
}
