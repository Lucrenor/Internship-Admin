import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './view/navbar/navbar.component';
import { PanelComponent } from './view/panel/panel.component';
import { LoginComponent } from './view/login/login.component';
import { StatusComponent } from './view/status/status.component';
import { ProfileComponent } from './view/profile/profile.component';
import { ApplicantDataComponent } from './view/applicant-data/applicant-data.component';
import { InboxComponent } from './view/inbox/inbox.component';
import { AuthGuard } from './service/AuthGuard';
import { HttpClientModule } from '@angular/common/http';
import {NotFoundComponent} from "./view/not-found/not-found.component";

@NgModule({
  declarations: [

  ],
  imports: [
    AppComponent,
    NavbarComponent,
    PanelComponent,
    LoginComponent,
    StatusComponent,
    ProfileComponent,
    ApplicantDataComponent,
    InboxComponent,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotFoundComponent
  ],
  providers: [AuthGuard],
})
export class AppModule {}
