import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../app.component.css'],
})
export class NavbarComponent implements OnInit {
  user: any;
  constructor(private router: Router) {
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
