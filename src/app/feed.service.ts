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
}
