import { Component, OnInit } from '@angular/core';
import {
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/firestore';

import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.css', '../app.component.css'],
})
export class NotificationDetailsComponent implements OnInit {
  currentUser: any;
  requestId: any;
  itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
  constructor(
    public afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentHayahAdmin'));
    console.log(this.currentUser);
    if (
      this.currentUser == null ||
      this.currentUser == undefined ||
      this.currentUser == {}
    ) {
      this.router.navigate(['/login']);
    }
    this.route.queryParams.subscribe((params) => {
      this.requestId = params['id'];
      console.log(this.requestId);
      this.requestId = this.requestId.trim();
      this.itemDoc = this.afs.doc<any>(
        'donation_notifications/' + this.requestId
      );
      this.item = this.itemDoc.valueChanges();
      this.itemDoc.update({ viewed: true });
      this.item.subscribe((event) => {});
    });
  }

  ngOnInit(): void {}
}
