import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, Form } from '@angular/forms';
import { Appointment } from './appointment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-online-appointment',
  templateUrl: './online-appointment.component.html',
  styleUrls: ['./online-appointment.component.css']
})
export class OnlineAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  appointment: Appointment;
  prefix:any = [];
  gender:any = [];
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
    ) {}
  ngOnInit() {
    this.appointmentForm = this.fb.group({
    dob: [801063798000,[Validators.required]],
    firstName: ['', [Validators.required, Validators.minLength(4)]],
    gender: ['',[Validators.required]],
    guardianName: ['',[Validators.required, Validators.minLength(4)]],
    guardianType: ['', [Validators.required]],
    lastName: ['', [Validators.required, Validators.minLength(4)]],
    phoneNumber: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    prefix: ['', [Validators.required]],
    reason:  ['', [Validators.required, Validators.minLength(6)]]
    })
    this.getPrefix().subscribe(res => {
      this.prefix = (res)
    })
    this.getGender().subscribe(res => {
      this.gender = (res)
    })
  }
  getPrefix () {
    return this.http.get('http://103.211.39.48:8073/chemrsvcs/jsonapi/nosur/oas/getChemrPropetiesByPropertyTypeId/106')
  }
  getGender () {
    return this.http.get(' http://103.211.39.48:8073/chemrsvcs/jsonapi/nosur/oas/getChemrPropetiesByPropertyTypeId/1')
  }
  createAppointment() {
    let date = (this.appointmentForm.controls['dob'].value).getTime();
    this.appointmentForm.addControl('appointmentDate', new FormControl(+ new Date()));
    this.appointmentForm.addControl('appointmentStatus', new FormControl(2));
    this.appointmentForm.addControl('customerGroupId', new FormControl(1));
    this.appointmentForm.addControl('doctorId', new FormControl(12));
    this.appointmentForm.addControl('facilityId', new FormControl(6));
    this.appointmentForm.addControl('metaDateCreated', new FormControl(+new Date));
    this.appointmentForm.addControl('metaStatus', new FormControl(true));
    this.appointmentForm.addControl('metaUserCreated', new FormControl(23));
    this.appointmentForm.addControl('userSlot', new FormControl(127810));
    this.appointmentForm.setControl('dob', new FormControl(date));
    this.createAppointmentService(this.appointmentForm.value).subscribe(res => {
      this.router.navigate(['/task/show/' + res]);
    })
  }


  createAppointmentService(model: Appointment):Observable <any> {
    var url = "http://103.211.39.48:8073/chemrsvcs/jsonapi/nosur/oas/createCHEMROnlineAppointments";
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "Authorization": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrYXBpbC5mZCIsImNyZWF0ZWQiOjE1NDk0MzU2NDU5MjR9.jixFcf388HXRzMuZ8IWtAYdRtW_RV7Jo3AnA5NHgBufrnMyJ0g94tJgd_MEMF38nJstWPn79cXYWDFoI4NsfOQ"
      })
    };
    return this.http.post(url, model, httpOptions)
      .pipe(
        tap(res => {
          // console.log('search:' + JSON.stringify(res))
        })
      )
  }
  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}

