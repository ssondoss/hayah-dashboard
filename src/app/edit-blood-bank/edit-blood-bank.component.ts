import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-blood-bank',
  templateUrl: './edit-blood-bank.component.html',
  styleUrls: ['./edit-blood-bank.component.css', '../app.component.css'],
})
export class EditBloodBankComponent implements OnInit {
  itemDoc: any;
  item: any;
  requestId(requestId: any) {
    throw new Error('Method not implemented.');
  }
  formData: FormGroup;
  currentUser: any;
  bank: any;
  constructor(
    public formBuilder: FormBuilder,
    public afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentHayahAdmin'));
    // console.log(this.currentUser);
    if (
      this.currentUser == null ||
      this.currentUser == undefined ||
      this.currentUser == {}
    ) {
      this.router.navigate(['/login']);
    } else if (this.currentUser.role === 'BLOOD_BANK') {
      this.router.navigate(['/']);
    } else {
      this.route.queryParams.subscribe((params) => {
        this.bank = params['bank'];
        // console.log(this.bank);
        this.requestId = this.bank.trim();
        this.itemDoc = this.afs.doc<any>('blood-bank-admin/' + this.requestId);
        this.item = this.itemDoc.valueChanges();
        this.item.subscribe((event) => {
          // console.log(event);
          this.formData = this.formBuilder.group({
            hospitalName: [
              event.username,
              Validators.compose([
                Validators.required,
                Validators.maxLength(500),
              ]),
            ],
            hospitalAddress: [
              event.hospitalAddress,
              Validators.compose([
                Validators.required,
                Validators.maxLength(500),
              ]),
            ],
            city: [event.city, Validators.required],
            phoneNumber1: [
              event.phoneNumber1,
              Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(10),
              ]),
            ],
            phoneNumber2: [
              event.phoneNumber2,
              Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(10),
              ]),
            ],
            phoneNumber3: [
              event.phoneNumber3,
              Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(10),
              ]),
            ],
            username: [
              event.username,
              Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
              ]),
            ],
            password: [
              event.password,
              Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
              ]),
            ],
          });
        });
      });
    }
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

  update() {
    let ref = this.afs.doc<any>(
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
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'لقد تم حفظ تعديلك بنجاح',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => history.back());
  }
}
