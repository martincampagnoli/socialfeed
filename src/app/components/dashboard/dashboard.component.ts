import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed/feed.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  mFeeds: Array<any> = [];
  newComment: string;
  currentUser: any;

  constructor(private feedService: FeedService, private authService: AuthService) { 
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
    this.feedService.getFeeds().subscribe(f => {
      f = f.filter(e =>  !this.containsObject(e, this.mFeeds) );

      f.forEach((v, i) => {
        setTimeout(() => {
          this.mFeeds.push(v);
        }, i * 2000);
      });
    })
  }

  containsObject(obj, list) {
    return list.filter( e => e.id === obj.id).length > 0;
  }

  toggle(feed) {
    feed.show = !feed.show;
  }

  saveComment(feed){
    if (!this.newComment){
      return;
    }
    this.feedService.saveComment(this.newComment, feed);
    this.newComment = '';
  }


}
