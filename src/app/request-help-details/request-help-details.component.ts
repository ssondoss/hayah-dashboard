import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import {
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-request-help-details',
  templateUrl: './request-help-details.component.html',
  styleUrls: ['./request-help-details.component.css', '../app.component.css'],
})
export class RequestHelpDetailsComponent implements OnInit {
  disabledNotes = true;
  disabledSelect = true;
  requestId: any;
  editStatus() {
    this.disabledSelect = false;
  }
  confirmStatus() {
    this.disabledSelect = true;
  }
  confirmNotes() {
    this.disabledNotes = true;
  }
  editAditionalNotes() {
    this.disabledNotes = false;
  }
  itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
  userId: any;
  userDoc: AngularFirestoreDocument<any>;
  user: Observable<any>;
  currentUser: any;
  filteredBanks = [];
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
    } else if (this.currentUser.role === 'BLOOD_BANK') {
      this.router.navigate(['/']);
    } else {
      this.route.queryParams.subscribe((params) => {
        this.requestId = params['id'];
        console.log(this.requestId);
        this.requestId = this.requestId.trim();
        this.itemDoc = this.afs.doc<any>('new-requests/' + this.requestId);
        this.item = this.itemDoc.valueChanges();
        this.itemDoc.update({ viewed: true });
        this.item.subscribe((event) => {
          this.userId = event.user;
          console.log(this.userId);
          this.userDoc = this.afs.doc<any>('users/' + this.userId.trim());
          this.user = this.userDoc.valueChanges();
        });
      });
    }
  }

  ngOnInit(): void {}

  getImageURL(image) {
    if (image != null) {
      const url =
        'https://firebasestorage.googleapis.com/v0/b/hayah-28356.appspot.com/o/' +
        image.replace('/', '%2F') +
        '?alt=media&token=c9e474ba-bc13-4766-916c-109826f50701';
      return url;
    } else return '';
  }

  acceptDonaitionRequest(request) {
    Swal.fire({
      title: 'قبول الاستدعاء',
      text: 'هل انت متأكد من قبول الاستدعاء ؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'الغاء',
      confirmButtonText: 'نعم ، تابع',
    }).then((result) => {
      if (result.isConfirmed) {
        request.subscribe((element) => {
          this.deleteFromTheRequests(element.id);
          let itemDoc = this.afs.doc<any>('accepted-requests/' + element.id);

          element.acceptedBy = this.currentUser.username;
          element.patientBloodType = element.bloodTypeValue;
          element.bloodTypeValue = this.getTypesHeCanTake(
            element.bloodTypeValue.trim()
          );
          itemDoc.set(element);

          console.log(element);
          itemDoc = this.afs.doc<any>('donation_notifications/' + element.id);
          element.by = 'USER';
          itemDoc.set(element);

          history.back();
        });
        Swal.fire('تم!', 'تم قبول الاستدعاء', 'success');
      }
    });
  }

  getTypesHeCanTake(type): string {
    let types = '';
    if (type == 'O+') types = ' O+ , O- ';
    else if (type == 'O-') types = ' O- ';
    else if (type == 'A+') types = ' A+ , A- , O+ , O- ';
    else if (type == 'A-') types = ' A- , O- ';
    else if (type == 'B+') types = ' B+ , B- , O+ , O- ';
    else if (type == 'B-') types = ' B- , O- ';
    else if (type == 'AB+') types = ' A+ , A- , B+ , B- , AB+ , AB- , O+ , O- ';
    else if (type == 'AB-') types = ' A- , B- , AB- , O- ';

    return types;
  }

  async rejectDonaitionRequest(request) {
    request.subscribe(async (element) => {
      const { value: text } = await Swal.fire({
        input: 'textarea',
        inputLabel: 'سبب الرفض',
        inputPlaceholder: 'سبب الرفض',
        inputAttributes: {
          'aria-label': 'سبب الرفض',
        },
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'الغاء',
        confirmButtonText: 'نعم ، تابع',
      });
      if (text) {
        this.deleteFromTheRequests(element.id);
        let itemDoc = this.afs.doc<any>('rejected-requests/' + element.id);
        element.rejectedFor = text;
        element.rejectedBy = this.currentUser.username;
        itemDoc.set(element);
        history.back();
      }
    });
  }

  deleteFromTheRequests(id: string): void {
    let itemDoc = this.afs.doc<any>('new-requests/' + id);
    itemDoc.delete();
  }
}
