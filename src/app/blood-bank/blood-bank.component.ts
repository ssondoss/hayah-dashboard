import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blood-bank',
  templateUrl: './blood-bank.component.html',
  styleUrls: ['./blood-bank.component.css', '../app.component.css'],
})
export class BloodBankComponent implements OnInit {
  formData: FormGroup;
  BloodBanksValues: any;
  user: any;

  constructor(
    public formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('currentHayahAdmin'));
    if (this.user == null || this.user == undefined || this.user == {}) {
      this.router.navigate(['/login']);
    } else if (this.user.role === 'BLOOD_BANK') {
      this.router.navigate(['/']);
    }
    this.getBloodBanks();
  }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      hospitalName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      hospitalAddress: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      city: ['', Validators.required],
      phoneNumber1: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ]),
      ],
      phoneNumber2: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ]),
      ],
      phoneNumber3: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ]),
      ],
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
    });
  }

  add() {
    let ref = this.firestore.doc<any>(
      'blood-bank-admin/' + this.formData.controls['username'].value
    );
    ref.set({
      hospitalName: this.formData.controls['hospitalName'].value,
      phoneNumber1: this.formData.controls['phoneNumber1'].value,
      phoneNumber2: this.formData.controls['phoneNumber2'].value,
      phoneNumber3: this.formData.controls['phoneNumber3'].value,
      username: this.formData.controls['username'].value,
      password: this.formData.controls['password'].value,
      city: this.formData.controls['city'].value,
      hospitalAddress: this.formData.controls['hospitalAddress'].value,
      role: 'BLOOD_BANK',
    });
    this.formData = this.formBuilder.group({
      hospitalName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      hospitalAddress: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      city: ['', Validators.required],
      phoneNumber1: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ]),
      ],
      phoneNumber2: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ]),
      ],
      phoneNumber3: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ]),
      ],
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
    });
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'تمت الإضافة بنجاح ',

      showConfirmButton: false,
      timer: 1500,
    });
  }

  makeId(length): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  getBloodBanks() {
    this.BloodBanksValues = this.firestore
      .collection('blood-bank-admin', (ref) =>
        ref.where('role', '!=', 'MAIN_ADMIN')
      )
      .valueChanges();
  }
  delete(username) {
    let ref = this.firestore.doc<any>('blood-bank-admin/' + username);
    ref.delete();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Deleted ',
      showConfirmButton: false,
      timer: 1500,
    });
    this.getBloodBanks();
  }
}
