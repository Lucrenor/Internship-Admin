import { Routes } from '@angular/router';
import {NavbarComponent} from "./view/navbar/navbar.component";
import {PanelComponent} from "./view/panel/panel.component";
import {LoginComponent} from "./view/login/login.component";
import {StatusComponent} from "./view/status/status.component";
import {ApplicantDataComponent} from "./view/applicant-data/applicant-data.component";
import {InboxComponent} from "./view/inbox/inbox.component";
import {AuthGuard} from "./service/AuthGuard";
import {NotFoundComponent} from "./view/not-found/not-found.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'navbar', component: NavbarComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: PanelComponent, canActivate: [AuthGuard] },
  { path: 'status', component: StatusComponent, canActivate: [AuthGuard] },
  { path: 'applicants', component: ApplicantDataComponent, canActivate: [AuthGuard] },
  { path: 'inbox', component: InboxComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];
