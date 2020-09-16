import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [ { provide: AngularFireAuth, useValue: {} } ]
    });
    service = TestBed.inject(AuthService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
