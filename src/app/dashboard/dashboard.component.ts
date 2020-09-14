import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  mFeeds: Array<any> = [];
  counter = 10;


  constructor(private feedService: FeedService) { }

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

  addPost(){
    console.dir(this.counter);
    this.feedService.addPost(this.counter++);
  }


}
