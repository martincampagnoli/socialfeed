import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from '@angular/fire/database';
import { from, BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable(); 
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email, password) {
    const subscription = from(this.afAuth.signInWithEmailAndPassword(email, password));

    return subscription.pipe( r => r );
  }
  
  
  logout(){
    this.afAuth.signOut();
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  storeUserInfo(uid: string){
    this.db.object('users/' + uid).valueChanges().subscribe(
      user => {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }

    );
  }
}