import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-approved-request-help',
  templateUrl: './approved-request-help.component.html',
  styleUrls: ['./approved-request-help.component.css', '../app.component.css'],
})
export class ApprovedRequestHelpComponent implements OnInit {
  requests: Observable<any[]>;
  user: any;
  constructor(private router: Router, public afs: AngularFirestore) {
    this.user = JSON.parse(localStorage.getItem('currentHayahAdmin'));
    if (this.user == null || this.user == undefined || this.user == {}) {
      this.router.navigate(['/login']);
    } else if (this.user.role === 'BLOOD_BANK') {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    if (this.user.role == 'MAIN_ADMIN')
      this.requests = this.afs.collection('accepted-requests').valueChanges();
  }
}
