import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

// Custom Validation

function ratingRange (c: AbstractControl):{ [key: string]: boolean } | null { 
  if (c.value !== null && (isNaN(c.value)|| c.value > 5 || c.value < 1)) {
    return { 'range': true }
  }
  return null;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  // customer = new Customer();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.email, Validators.required]],
      sendCatalog: true,
      phone: [''],
      notification: 'email',
      rating: [null, ratingRange]
    })
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  update(): void {
    this.customerForm.patchValue({
      firstName: 'sandeep',
      lastName: 'ganesana',
      email: 'sandeep@sandeep.com',
      sendCatalog: false,
      phone: '',
      notification: 'email'
    })
    this.notify('email');
  }


  
  notify(value: string){
    const phoneControl = this.customerForm.get('phone');
    if(value === 'mobile') {
      phoneControl.setValidators([Validators.minLength(10), Validators.required]);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
