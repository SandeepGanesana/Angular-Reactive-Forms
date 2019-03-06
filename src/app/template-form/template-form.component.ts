import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  user: any = {}
  constructor() { }
  save(addressForm) {
    if(addressForm.agree){
      console.log('Form Submitted'+addressForm)
    }
    else {
      
    }
  }
  ngOnInit() {
  }
}
