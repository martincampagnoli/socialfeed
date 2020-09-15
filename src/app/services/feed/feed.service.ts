import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { dirname } from 'path';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  currentDate = new Date();
  cValue = formatDate(this.currentDate, 'dd-MM-yyyy', 'en-US');
  currentUser: any;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
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
    console.dir(this.currentUser);
    const feedRef = this.db.list('feeds');
    const newPost = {
      "author": this.currentUser.name,
      "role": this.currentUser.role,
      "content": content,
      "likes": 0,
      "created": this.cValue
    }
    
    feedRef.push(newPost);
    return newPost;
  }

  saveComment(newComment: string, feed){
    const feedRef = this.db.list('feeds');
    const updatedFeed = {
      comments: []
    }
    const newCommentObj = {
      commentAuthor: this.currentUser.name, 
      commentContent: newComment, 
      commentCreated: this.cValue
    };

    if (!feed.comments){
      let comments = [];
      comments.push(newCommentObj);
      updatedFeed.comments = comments;
      feed.comments = comments;
    }
    else {
      feed.comments.push(newCommentObj);
      updatedFeed.comments = feed.comments;
    }
    feedRef.update(feed.uid, updatedFeed);
  }
}
