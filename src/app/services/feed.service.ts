import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private db: AngularFireDatabase) {
  }

  getFeeds() {
    return this.db.list('feeds').snapshotChanges()
    .pipe(map(action => action
      .map(a => {
        const data:{} = a.payload.val(); 
        const uid = a.payload.key; 
        return {uid, ...data}
      })
    ));
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

  saveComment(newComment: string, feedUid: string){
    const itemsRef = this.db.list('items');
    itemsRef.update(feedUid, { comments: [...newComment] });
  }
}
