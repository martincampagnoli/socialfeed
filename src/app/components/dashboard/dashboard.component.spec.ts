import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { FeedService } from 'src/app/services/feed/feed.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BehaviorSubject, from } from 'rxjs';

const currentUserSubject = new BehaviorSubject<any>({});
const mockAuthService = {
  currentUser: currentUserSubject.asObservable()
};
const mockFeedService = {
  getFeed: () => from([]),
  addLike: (param) => false,
  saveComment: (post, test) => false
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
  it('should return false if object is not in given array', () => {
    const obj = { uid: 1 };
    const list = [];
    list.push(1);
    list.push(2);
    expect(component.containsObject(obj, list)).toBeFalsy();
  });
  it('should return true if object is in given array', () => {
    const obj = { uid: 1 };
    const list = [];
    list.push(1);
    list.push(2);
    list.push(obj);
    expect(component.containsObject(obj, list)).toBeTruthy();
  });
  it('should toggle show values on post object', () => {
    const initialValue = Math.random() < 0.5;
    const obj = { show: initialValue };
    component.toggle(obj);
    expect(obj.show).toBe(!initialValue);
  });
  it('should call service method with given parameter', () => {
    const obj = { show: true} ;
    spyOn(mockFeedService, 'addLike');
    component.addLike(obj);

    expect(mockFeedService.addLike).toHaveBeenCalled();
    expect(mockFeedService.addLike).toHaveBeenCalledWith(obj);
  });
  it('should return true if user is able to like comment: logged user did not give like yet', () => {
    component.currentUser = { name: 'test', uid: '1' };
    const post = { likesAuthors: [ '2' ] };
    expect(component.canLike(post)).toBeTruthy();
  });
  it('should return false if user is not able to like comment: not logged user', () => {
    component.currentUser = null;
    const post = { likesAuthors: [ '2' ]};
    expect(component.canLike(post)).toBeFalsy();
  });
  it('should return false if user is not able to like comment: user already gave like', () => {
    component.currentUser = { name: 'test', uid: '1' };
    const post = { likesAuthors: [ '1' ] };
    expect(component.canLike(post)).toBeFalsy();
  });
  it('should do nothing if comment is an empty string', () => {
    const index = 1;
    const post = {};
    component.newComment[index] = '';
    spyOn(mockFeedService, 'saveComment');
    component.saveComment(post, index);
    expect(mockFeedService.saveComment).not.toHaveBeenCalled();
  });
  it('should call function to store comment if not empty string', () => {
    const index = 1;
    const post = {};
    component.newComment[index] = 'test comment';
    const value = component.newComment[index];
    spyOn(mockFeedService, 'saveComment');
    component.saveComment(post, index);
    expect(mockFeedService.saveComment).toHaveBeenCalled();
    expect(mockFeedService.saveComment).toHaveBeenCalledWith(value, post);
  });
  it('should clear comment string after storing it', () => {
    const index = 1;
    const post = {};
    component.newComment[index] = 'test comment';
    spyOn(mockFeedService, 'saveComment');
    component.saveComment(post, index);
    expect(component.newComment[index]).toBe('');
  });
});
