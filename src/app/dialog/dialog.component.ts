import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  description:string;

  constructor(
      private dialogRef: MatDialogRef<DialogComponent>) {

      
  }

  ngOnInit() {
  }

  save() {
      this.dialogRef.close();
  }

  close() {
      this.dialogRef.close();
  }
}