import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Appointment } from './appointment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private getAppointments = 'http://103.211.39.48:8073/chemrsvcs/jsonapi/nosur/oas/getAllCHEMROnlineAppointmentsByVO';
  private createAppointment = 'http://103.211.39.48:8073/chemrsvcs/jsonapi/nosur/oas/createCHEMROnlineAppointments';
  private showAppointment = 'http://103.211.39.48:8073/chemrsvcs/jsonapi/nosur/oas/findCHEMROnlineAppointmentsById/';
 
  constructor(private http: HttpClient) { }

  getAppointmentsOnline (data: any): Observable<any> { // get appointment details with certain data
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrYXBpbC5mZCIsImNyZWF0ZWQiOjE1NDk0MzU2NDU5MjR9.jixFcf388HXRzMuZ8IWtAYdRtW_RV7Jo3AnA5NHgBufrnMyJ0g94tJgd_MEMF38nJstWPn79cXYWDFoI4NsfOQ'
      })
    };
    return this.http.post<any>(this.getAppointments, data, httpOptions)
      .pipe(
        tap(d => {
          // console.log('search: ' + JSON.stringify(d))
        }),
        catchError(this.handleError)
      );
  }

  showAppoitmentDetails (id: string) { // show particular appointment details with ID
    return this.http.get(this.showAppointment + id);
  }

  getPrefix () { // to get prefix in form
    return this.http.get('http://103.211.39.48:8073/chemrsvcs/jsonapi/nosur/oas/getChemrPropetiesByPropertyTypeId/106')
  }
  getGender () {  // to get gender in form
    return this.http.get(' http://103.211.39.48:8073/chemrsvcs/jsonapi/nosur/oas/getChemrPropetiesByPropertyTypeId/1')
  }

  createAppointmentService(model: Appointment):Observable <any> { // create appointment
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "Authorization": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrYXBpbC5mZCIsImNyZWF0ZWQiOjE1NDk0MzU2NDU5MjR9.jixFcf388HXRzMuZ8IWtAYdRtW_RV7Jo3AnA5NHgBufrnMyJ0g94tJgd_MEMF38nJstWPn79cXYWDFoI4NsfOQ"
      })
    };
    return this.http.post(this.createAppointment, model, httpOptions)
      .pipe(
        tap(res => {
          // console.log('search:' + JSON.stringify(res))
        }),
        catchError(this.handleError)
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
