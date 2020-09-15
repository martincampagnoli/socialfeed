import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FeedService } from 'src/app/services/feed/feed.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  postMessage: string;

  constructor(private dialogRef: MatDialogRef<DialogComponent>, private feedService: FeedService) {   
  }

  ngOnInit() {
  }

  save() {
      this.feedService.addPost(this.postMessage);
      this.dialogRef.close();
  }

  close() {
      this.dialogRef.close();
  }
}