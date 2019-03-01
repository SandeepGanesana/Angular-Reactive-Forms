import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, Form } from '@angular/forms';
import { Appointment } from './appointment';
import { Router } from '@angular/router';
import { TaskService } from './task.service';
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
    private router: Router,
    private taskService: TaskService
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
    this.taskService.getPrefix().subscribe(res =>this.prefix = res);
    this.taskService.getGender().subscribe(res => this.gender = res);
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
    this.taskService.createAppointmentService(this.appointmentForm.value).subscribe(res => {
      this.router.navigate(['/task/show/' + res]);
    })
  }
}

