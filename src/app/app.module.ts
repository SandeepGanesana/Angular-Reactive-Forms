import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customers/customer.component';
import { SignupComponent } from './signup/signup.component';
import { LetterComponent } from './letter/letter.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    SignupComponent,
    LetterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: CustomerComponent},
      {path: 'request', component: SignupComponent, pathMatch: 'full'},
      {path: 'letter', component: LetterComponent , pathMatch: 'full'},
      {path: '**', redirectTo: '', pathMatch: 'full'}
    ])
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

