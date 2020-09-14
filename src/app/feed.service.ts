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

  addPost(number){
    const itemRef = this.db.list('feeds');
    console.dir(number)
    itemRef.push({
      "id": number,
      "author": "admin" + number,
      "content": "test description " + number,
      "likes": 27,
      "created": "10-10-2020",
      "comments": [{
          "commentAuthor":"testUser",
          "commentContent": "great app",
          "commentCreated": "11-11-2020"
      }]
  });
  }
}
