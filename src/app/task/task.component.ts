import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from './appointment';
import { TaskService } from './task.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  taskForm: FormGroup;
  tableData: Appointment[] = [];
  appId: string;
  status= [
    {name: 'online', id: 1},
    {name: 'offline', id: 2},
    {name: 'pending', id: 3}
  ]
  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private taskService: TaskService
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
      // this.appId ? this.taskService.showAppoitmentDetails(this.appId).subscribe(res => {this.tableData.push(res)}) : null;
    });

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
    this.taskService.getAppointmentsOnline(this.taskForm.value).subscribe(res => this.tableData = res);
  }
}
