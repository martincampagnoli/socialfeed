import { TestBed } from '@angular/core/testing';

import { FeedService } from './feed.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

describe('FeedService', () => {
  let service: FeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule
      ],
      declarations: [
      ],
      providers:[AngularFirestore,AngularFireAuth, AngularFireDatabase
      
      
        ]
    });
    service = TestBed.inject(FeedService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
