import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-rejected-request-help-details',
  templateUrl: './rejected-request-help-details.component.html',
  styleUrls: [
    './rejected-request-help-details.component.css',
    '../app.component.css',
  ],
})
export class RejectedRequestHelpDetailsComponent implements OnInit {
  itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
  userId: any;
  userDoc: AngularFirestoreDocument<any>;
  user: Observable<any>;
  requestId: any;

  constructor(
    public afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    let user = JSON.parse(localStorage.getItem('currentHayahAdmin'));
    console.log(user);
    if (user == null || user == undefined || user == {}) {
      this.router.navigate(['/login']);
    } else if (user.role === 'BLOOD_BANK') {
      this.router.navigate(['/']);
    } else {
      this.route.queryParams.subscribe((params) => {
        this.requestId = params['id'];
        console.log(this.requestId);
        this.requestId = this.requestId.trim();
        this.itemDoc = this.afs.doc<any>('rejected-requests/' + this.requestId);
        this.item = this.itemDoc.valueChanges();
        this.itemDoc.update({ viewed: true });
        this.item.subscribe((event) => {
          this.userId = event.user;
          console.log(this.userId);
          this.userDoc = this.afs.doc<any>('users/' + this.userId.trim());
          this.user = this.userDoc.valueChanges();
        });
      });
    }
  }

  ngOnInit(): void {}

  getImageURL(image) {
    if (image != null) {
      const url =
        'https://firebasestorage.googleapis.com/v0/b/hayah-28356.appspot.com/o/' +
        image.replace('/', '%2F') +
        '?alt=media&token=c9e474ba-bc13-4766-916c-109826f50701';
      return url;
    } else return '';
  }
}
