import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';

const mat = [
  MatMenuModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
];

const firebaseConfig = {
  apiKey: "AIzaSyBKWjTby9Joa8gFERbnDbRomcoIpIXNRX8",
  authDomain: "m79feed.firebaseapp.com",
  databaseURL: "https://m79feed.firebaseio.com",
  projectId: "m79feed",
  storageBucket: "m79feed.appspot.com",
  messagingSenderId: "612367989184",
  appId: "1:612367989184:web:e2989b57179283606cf025"
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    ...mat
  ],
  exports:[...mat],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



