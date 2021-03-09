import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css', '../app.component.css'],
})
export class NotificationsComponent implements OnInit {
  requests: Observable<any[]>;
  user: any;
  constructor(private router: Router, public afs: AngularFirestore) {
    this.user = JSON.parse(localStorage.getItem('currentHayahAdmin'));
    if (this.user == null || this.user == undefined || this.user == {}) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    if (this.user.role == 'MAIN_ADMIN')
      this.requests = this.afs
        .collection('donation_notifications', (ref) =>
          ref.where('by', '==', 'BLOOD_BANK')
        )
        .valueChanges();
    else
      this.requests = this.afs
        .collection('donation_notifications', (ref) =>
          ref.where('hospitalValue', '==', this.user.hospitalName.trim())
        )
        .valueChanges();
  }

  getByCity(value) {
    if (this.user.role == 'MAIN_ADMIN')
      this.requests = this.afs
        .collection('donation_notifications', (ref) =>
          ref.where('cityValue', '==', value)
        )
        .valueChanges();
  }
}
