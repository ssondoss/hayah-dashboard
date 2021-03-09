import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css', '../app.component.css'],
})
export class SendNotificationComponent implements OnInit {
  formData: FormGroup;
  BloodBanksValues: any;
  user: any;
  checkAll = false;
  o_plus = false;
  a_plus = false;
  b_plus = false;
  ab_plus = false;
  o_minus = false;
  a_minus = false;
  b_minus = false;
  ab_minus = false;

  constructor(
    public formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('currentHayahAdmin'));
    if (this.user == null || this.user == undefined || this.user == {}) {
      this.router.navigate(['/login']);
    }
    this.BloodBanksValues = firestore
      .collection('accepted-requests')
      .valueChanges();
  }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      phoneNumber1: [
        this.user.phoneNumber1,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ]),
      ],
      phoneNumber2: [
        this.user.phoneNumber2,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ]),
      ],
      phoneNumber3: [
        this.user.phoneNumber3,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ]),
      ],
      username: [''],
      password: [''],
      city: [this.user.city],
      hospitalName: [this.user.hospitalName, Validators.required],
      hospitalAddress: [this.user.hospitalAddress, Validators.required],
      bloodUnitsCount: ['', Validators.required],
      notes: ['', Validators.required],
      op: [false],
      om: [false],
      ap: [false],
      am: [false],
      bp: [false],
      bm: [false],
      abp: [false],
      abm: [false],
    });
  }

  add() {
    let altPhoneValue = this.formData.controls['phoneNumber2'].value;
    let bedValue = 'لا يوجد';
    let bloodTypeValue = this.getBloodType();
    let cityValue = this.formData.controls['city'].value;
    let x = new Date().getTime() / 1000;
    let i = parseInt(x + '');
    let date = i;
    let dateValue = 'none';
    let floorValue = 'none';
    let genderValue = 'none';
    let hospitalValue = this.formData.controls['hospitalName'].value;
    let id = this.makeId(40);
    let imagePath = 'none';
    let nameValue = this.formData.controls['hospitalName'].value;
    let nationalIdValue = 'none';
    let notesValue = this.formData.controls['notes'].value;
    let phoneValue = this.formData.controls['phoneNumber1'].value;
    let altPhoneValue2 = this.formData.controls['phoneNumber2'].value;
    let reasonValue = this.formData.controls['notes'].value;
    let bloodUnitsCount = this.formData.controls['bloodUnitsCount'].value;
    let ref = this.firestore.doc<any>('donation_notifications/' + id);
    if (bloodUnitsCount === '' || bloodTypeValue === '') {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'الرجاء ادخال جميع الحقول ',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      ref.set({
        altPhoneValue: altPhoneValue,
        bedValue: bedValue,
        bloodTypeValue: bloodTypeValue,
        cityValue: cityValue,
        date: date,
        unitsValue: bloodUnitsCount,
        dateValue: dateValue,
        floorValue: floorValue,
        genderValue: genderValue,
        hospitalValue: hospitalValue,
        id: id,
        imagePath: imagePath,
        hospitalAddress: this.user.hospitalAddress,
        nameValue: nameValue,
        nationalIdValue: nationalIdValue,
        notesValue: notesValue,
        altPhoneValue2: altPhoneValue2,
        phoneValue: phoneValue,
        reasonValue: reasonValue,
        hospitalUsername: this.user.username,
        by: 'BLOOD_BANK',
      });
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'تم إرسال الطلب ',
        showConfirmButton: false,
        timer: 1500,
      });
    }
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

  selectAll() {
    if (!this.checkAll) {
      this.checkAll = true;
      this.o_plus = true;
      this.a_plus = true;
      this.b_plus = true;
      this.ab_plus = true;
      this.o_minus = true;
      this.a_minus = true;
      this.b_minus = true;
      this.ab_minus = true;
      this.formData.controls['op'].setValue(true);
      this.formData.controls['om'].setValue(true);

      this.formData.controls['ap'].setValue(true);
      this.formData.controls['am'].setValue(true);

      this.formData.controls['bp'].setValue(true);
      this.formData.controls['bm'].setValue(true);

      this.formData.controls['abp'].setValue(true);
      this.formData.controls['abm'].setValue(true);
    } else {
      this.checkAll = false;
      this.o_plus = false;
      this.a_plus = false;
      this.b_plus = false;
      this.ab_plus = false;
      this.o_minus = false;
      this.a_minus = false;
      this.b_minus = false;
      this.ab_minus = false;
      this.formData.controls['op'].setValue(false);
      this.formData.controls['om'].setValue(false);

      this.formData.controls['ap'].setValue(false);
      this.formData.controls['am'].setValue(false);

      this.formData.controls['bp'].setValue(false);
      this.formData.controls['bm'].setValue(false);

      this.formData.controls['abp'].setValue(false);
      this.formData.controls['abm'].setValue(false);
    }
  }
  getBloodType() {
    let type = '';
    this.formData.controls['op'].value ? (type += 'O + , ') : (type += '');
    this.formData.controls['om'].value ? (type += 'O - , ') : (type += '');

    this.formData.controls['ap'].value ? (type += 'A + , ') : (type += '');
    this.formData.controls['am'].value ? (type += 'A - , ') : (type += '');

    this.formData.controls['bp'].value ? (type += 'B + , ') : (type += '');
    this.formData.controls['bm'].value ? (type += 'B - , ') : (type += '');

    this.formData.controls['abp'].value ? (type += 'AB + , ') : (type += '');
    this.formData.controls['abm'].value ? (type += 'AB - , ') : (type += '');

    return type.substring(0, type.length - 1);
  }
}
