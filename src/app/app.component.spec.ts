import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth/auth.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';

const data = { title: "test", description: "testDesc" };
let currentUserSubject = new BehaviorSubject<any>({});
const mockAuthService = {
  currentUser: currentUserSubject.asObservable(),
  logout: () => false,
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule,
        AngularFirestoreModule,
        MatDialogModule,
        MatMenuModule
      ],
      declarations: [
        AppComponent
      ],
      providers:[AngularFirestore,
        { provide: MatDialogRef, useValue: {} }, 
        { provide: AuthService, useValue: mockAuthService }, 
        { provide: MAT_DIALOG_DATA, useValue: data }
      
      
        ]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'socialfeed'`, () => {
    expect(component.title).toEqual('socialfeed');
  });
  it(`should call auth service method when calling logout method on the component`, () => {
    spyOn(mockAuthService, "logout");
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });
  it(`should go to a default route calling method with empty string while logging out`, () => {
    spyOn(component, "goTo");
    component.logout();
    expect(component.goTo).toHaveBeenCalledWith('');
  });


});
