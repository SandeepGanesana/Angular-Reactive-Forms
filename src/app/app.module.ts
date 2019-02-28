import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customers/customer.component';
import { SignupComponent } from './signup/signup.component';
import { LetterComponent } from './letter/letter.component';
import { TaskComponent } from './task/task.component';
import { HttpClientModule } from '@angular/common/http';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OnlineAppointmentComponent } from './task/online-appointment.component';

// import { DatepickerModule } from 'angular7-material-datepicker';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    SignupComponent,
    LetterComponent,
    TaskComponent,
    OnlineAppointmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: CustomerComponent},
      {path: 'request', component: SignupComponent, pathMatch: 'full'},
      {path: 'letter', component: LetterComponent , pathMatch: 'full'},
      {path: 'task', component: TaskComponent , pathMatch: 'full'},
      {path: 'task/create', component: OnlineAppointmentComponent , pathMatch: 'full'},
      {path: '**', redirectTo: '', pathMatch: 'full'}
    ]),
    // DatepickerModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

