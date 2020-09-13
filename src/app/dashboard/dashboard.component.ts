import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  mFeeds: any;


  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
    this.mFeeds = this.feedService.getFeeds();
  }

}
