import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rejected-request-help',
  templateUrl: './rejected-request-help.component.html',
  styleUrls: ['./rejected-request-help.component.css', '../app.component.css'],
})
export class RejectedRequestHelpComponent implements OnInit {
  requests: Observable<any[]>;

  constructor(private router: Router, public afs: AngularFirestore) {
    let user = JSON.parse(localStorage.getItem('currentHayahAdmin'));
    console.log(user);
    if (user == null || user == undefined || user == {}) {
      this.router.navigate(['/login']);
    } else if (user.role === 'BLOOD_BANK') {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.requests = this.afs.collection('rejected-requests').valueChanges();
  }
}
