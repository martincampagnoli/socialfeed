import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  mFeeds: Array<any> = [];
  newComment: string;

  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
    this.feedService.getFeeds().subscribe(f => {
      console.dir(f)
      f = f.filter(e =>  !this.containsObject(e, this.mFeeds) );

      f.forEach((v, i) => {
        setTimeout(() => {
          console.dir(v);
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

  saveComment(feedUid){
    if (!this.newComment){
      return;
    }
    console.dir(feedUid);
    this.newComment = '';
    this.feedService.saveComment(this.newComment, feedUid);
  }


}
