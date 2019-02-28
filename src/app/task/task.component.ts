import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  private url = 'http://103.211.39.48:8073/chemrsvcs/jsonapi/nosur/oas/getAllCHEMROnlineAppointmentsByVO';
  taskForm: FormGroup;
  tableData: any = [];
  appId: string;
  status= [
    {name: 'online', id: 1},
    {name: 'offline', id: 2},
    {name: 'pending', id: 3}
  ]
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: ActivatedRoute
    ) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      appointmentStatus: this.fb.array([
      ]), 
      customerGroupId: ['', [Validators.required]],
      dateTime: ['', Validators.required],
      facilityId: ['', Validators.required]
    })
    this.router.paramMap.subscribe(params => {
      this.appId = params.get("id");
      this.appId ? this.getAppDetails(this.appId).subscribe(res => this.tableData.push(res)) : null;
    });

  }
  getAppDetails (id:any) {
    return this.http.get('http://103.211.39.48:8073/chemrsvcs/jsonapi/nosur/oas/findCHEMROnlineAppointmentsById/' + id);
  }
  get getAppointmentStatus() {
    return this.taskForm.get('appointmentStatus') as FormArray;
  }

  addAppointmentStatus(id) {
    let index = this.getAppointmentStatus.controls.findIndex(control => {
      return control.value == id;
    });
    if (index < 0) {
      this.addItem(id)
    } 
    else {
      this.removeItem(id)
    }
  }

  private addItem(value: number) {  
    this.getAppointmentStatus.push(new FormControl(value));
  }
  private removeItem(value: number) {
    let index = this.getAppointmentStatus.controls.findIndex(control => {
      return control.value == value;
    });
    this.getAppointmentStatus.removeAt(index);
  }
  
  onlineAppointments() {
    // var obj = this.taskForm.controls;
    // this.taskForm.patchValue({
    //   appointmentStatus: [`` + obj.appointmentStatus.value + ``]
    // })
    // console.log(this.taskForm.value)
    this.searchOnline(this.taskForm.value).subscribe(res => {
        this.tableData = (res);
        // console.log(this.tableData)
      } 
    )
  }

  searchOnline (data: any): Observable<any> { //service
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrYXBpbC5mZCIsImNyZWF0ZWQiOjE1NDk0MzU2NDU5MjR9.jixFcf388HXRzMuZ8IWtAYdRtW_RV7Jo3AnA5NHgBufrnMyJ0g94tJgd_MEMF38nJstWPn79cXYWDFoI4NsfOQ'
      })
    };
    return this.http.post<any>(this.url, data, httpOptions)
      .pipe(
        tap(d => {
          // console.log('search: ' + JSON.stringify(d))
        }),
        catchError(this.handleError)
      );
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
