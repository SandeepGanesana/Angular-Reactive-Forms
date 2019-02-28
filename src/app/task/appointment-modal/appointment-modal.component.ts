import {Component, Input, OnInit} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Appointment } from '../appointment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'appointment-modal',
  templateUrl: './appointment-modal.component.html'
})
export class AppointmentModalComponent {
  @Input() currentApp: any;
  closeResult: string;

  constructor(private modalService: NgbModal, private http: HttpClient) {}

  ngOnInit() {
    // this.http.get('http://103.211.39.48:8073/chemrsvcs/jsonapi/nosur/oas/findCHEMROnlineAppointmentsById/184')
    // .subscribe(res=> {
    //   this.currentApp = res;
    //   console.log(this.currentApp)
    // })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
