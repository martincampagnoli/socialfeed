import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeedService } from 'src/app/services/feed/feed.service';

const data = { title: "test", description: "testDesc" };
const mockFeedService = {
  addPost: (post) => false
}

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      declarations: [
        DialogComponent
      ],
      providers: [
        { provide: FeedService, useValue: mockFeedService },
        { provide: MatDialogRef, useValue: { open: () => false, close: () => false } }, 
        { provide: MAT_DIALOG_DATA, useValue: data }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call feedservice addpost method with given parameters', () => {
    component.postMessage = "testing";
    spyOn(mockFeedService, "addPost");
    component.save();
    expect(mockFeedService.addPost).toHaveBeenCalled();
    expect(mockFeedService.addPost).toHaveBeenCalledWith(component.postMessage);
    expect(mockFeedService.addPost).toHaveBeenCalledWith("testing");
  });
});

