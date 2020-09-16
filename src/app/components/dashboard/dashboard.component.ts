import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed/feed.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  mFeed: Array<any> = [];
  newComment: Array<any> = [];
  currentUser: any;

  constructor(private feedService: FeedService, private authService: AuthService) {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
    this.feedService.getFeed().subscribe(f => {
      f = f.filter(e =>  !this.containsObject(e, this.mFeed) );

      f.forEach((v, i) => {
        setTimeout(() => {
          this.mFeed.push(v);
        }, i * 2000);
      });

    });
  }

  containsObject(obj, list): boolean {
    return list.filter( e => e.uid === obj.uid).length > 0;
  }

  toggle(feed): void {
    feed.show = !feed.show;
  }

  saveComment(post, index): void {
    if (!this.newComment[index]){
      return;
    }
    this.feedService.saveComment(this.newComment[index], post);
    this.newComment[index] = '';
  }

  addLike(post): void {
    this.feedService.addLike(post);
  }

  canLike(feed): boolean{
    if (!this.currentUser) { return false; }
    if (!feed.likesAuthors) { return true; }
    if (!feed.likesAuthors.includes(this.currentUser.uid)) { return true; }
    return false;
  }
}
