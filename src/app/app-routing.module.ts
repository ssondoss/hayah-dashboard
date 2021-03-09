import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BloodBankComponent } from './blood-bank/blood-bank.component';
import { RequestHelpComponent } from './request-help/request-help.component';
import { RequestHelpDetailsComponent } from './request-help-details/request-help-details.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationDetailsComponent } from './notification-details/notification-details.component';
import { EditBloodBankComponent } from './edit-blood-bank/edit-blood-bank.component';
import { ApprovedRequestHelpComponent } from './approved-request-help/approved-request-help.component';
import { ApprovedRequestHelpDetailsComponent } from './approved-request-help-details/approved-request-help-details.component';
import { RejectedRequestHelpComponent } from './rejected-request-help/rejected-request-help.component';
import { RejectedRequestHelpDetailsComponent } from './rejected-request-help-details/rejected-request-help-details.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blood-bank', component: BloodBankComponent },
  { path: 'edit-blood-bank', component: EditBloodBankComponent },

  { path: 'login', component: LoginComponent },
  { path: 'request-help', component: RequestHelpComponent },
  { path: 'approved-request-help', component: ApprovedRequestHelpComponent },
  {
    path: 'approved-request-help-details',
    component: ApprovedRequestHelpDetailsComponent,
  },
  { path: 'rejected-request-help', component: RejectedRequestHelpComponent },
  {
    path: 'rejected-request-help-details',
    component: RejectedRequestHelpDetailsComponent,
  },
  {
    path: 'send-notification',
    component: SendNotificationComponent,
  },

  { path: 'request-help-details', component: RequestHelpDetailsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'notification-details', component: NotificationDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
