import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;

  constructor(
    public formBuilder: FormBuilder,
    public afs: AngularFirestore,
    private router: Router
  ) {
    let user = JSON.parse(localStorage.getItem('currentHayahAdmin'));
    console.log(user);
    if (user != null && user != undefined && user != {}) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  login() {
    this.itemDoc = this.afs.doc<any>(
      'blood-bank-admin/' + this.loginForm.controls['username'].value
    );
    this.item = this.itemDoc.valueChanges();

    this.item.subscribe((event) => {
      console.log(event);
      if (event != undefined) {
        if (event.password == this.loginForm.controls['password'].value) {
          localStorage.setItem('currentHayahAdmin', JSON.stringify(event));
          this.router.navigate(['/']);
        } else {
          alert('Worng username/password');
        }
      } else {
        alert('Worng username/password');
      }
    });
  }
}
