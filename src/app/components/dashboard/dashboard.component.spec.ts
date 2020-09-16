import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { FeedService } from 'src/app/services/feed/feed.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BehaviorSubject, Observable, from } from 'rxjs';

let currentUserSubject = new BehaviorSubject<any>({});
const mockAuthService = {
  currentUser: currentUserSubject.asObservable()
}
const mockFeedService = {
  getFeed: () => from([])
};

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        { provide: FeedService, useValue: mockFeedService },
        { provide: AuthService, useValue: mockAuthService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
