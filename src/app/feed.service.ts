import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

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
    const itemRef = this.db.list('feeds');
    let number = Math.random();
    itemRef.push({
      "id": number,
      "author": "admin" + number,
      "content": content,
      "likes": 27,
      "created": "10-10-2020",
      "comments": [{
      }]
  });
  }
}
