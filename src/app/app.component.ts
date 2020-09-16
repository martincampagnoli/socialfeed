import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'socialfeed';
  post: string;
  currentUser: any;

  constructor(private dialog: MatDialog,
              private router: Router,
              private authService: AuthService) {

    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  getCurrentRoute(): string {
    return this.router.url;
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '260px';

    this.dialog.open(DialogComponent, dialogConfig);
  }

  goTo(url: string): void {
    this.router.navigate([url]);
  }

  logout(): void {
    this.authService.logout();
    this.goTo('');
  }

}
