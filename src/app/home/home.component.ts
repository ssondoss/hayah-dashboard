import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;
  constructor(firestore: AngularFirestore, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentHayahAdmin'));
    console.log(this.user);
    if (this.user == null || this.user == undefined || this.user == {}) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('currentHayahAdmin');
    this.router.navigate(['/login']);
  }
}
