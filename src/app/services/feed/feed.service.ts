import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

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

  getFeed(): any {
    return this.db.list('feed').snapshotChanges()
    .pipe(map(action => action
      .map(a => {
        const data: {} = a.payload.val();
        const uid = a.payload.key;
        return { uid, ...data };
      })
    ));
  }

  addPost(content): void{
    const feedRef = this.db.list('feed');
    const newPost = {
      author: this.currentUser.name,
      content,
      created: this.cValue
    };

    feedRef.push(newPost);
  }

  saveComment(newComment: string, post): void{
    const feedRef = this.db.list('feed');
    const updatedFeed = {
      comments: []
    };
    const newCommentObj = {
      commentAuthor: this.currentUser.name,
      commentContent: newComment,
      commentCreated: this.cValue
    };

    if (!post.comments){
      const comments = [];
      comments.push(newCommentObj);
      updatedFeed.comments = comments;
      post.comments = comments;
    }
    else {
      post.comments.push(newCommentObj);
      updatedFeed.comments = post.comments;
    }
    feedRef.update(post.uid, updatedFeed);
  }

  addLike(post): void{
    const feedRef = this.db.list('feed');
    const updatedFeed = {
      likesAuthors: [],
    };

    if (!post.likesAuthors){
      const likesAuthors = [];
      likesAuthors.push(this.currentUser.uid);
      updatedFeed.likesAuthors = likesAuthors;
      post.likesAuthors = likesAuthors;
    }
    else {
      post.likesAuthors.push(this.currentUser.uid);
      updatedFeed.likesAuthors = post.likesAuthors;
    }
    feedRef.update(post.uid, updatedFeed);
  }

}
