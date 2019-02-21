import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

// Custom Validation
function ratingRange (min: number, max: number): ValidatorFn {
  return (c: AbstractControl):{ [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value)|| c.value > max || c.value < min)) {
      return { 'range': true };
    }
    return null;
  };
}

// Email Match Validation
function emailMatch(c: AbstractControl):{ [key: string]: boolean } | null {
    const first = c.get('email');
    const second = c.get('confirmEmail');
    console.log("I'm from  emailMatch Validators", c)
    if(first.pristine || second.pristine){
      return null;
    }

    if (first.value === second.value){
      return null;
    }
    return { 'match': true };
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  emailMessage: string;
  emailConfirmationMessage: string;

  private validationMessage = {
    required: 'Please Enter Your Email',
    email: 'Please Enter Valid Email',
    match: 'Confirm Your Email'
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.email, Validators.required]],
        confirmEmail: ['', [Validators.email, Validators.required]]
      }, { validator: emailMatch }),
      sendCatalog: true,
      phone: [''],
      notification: 'email',
      rating: [null, ratingRange(1,5)]
    })
    this.customerForm.get('notification').valueChanges.subscribe(
      value => this.setNotification(value)
    );

    const emailControl = this.customerForm.get('emailGroup.email');
    const emailConfirmControl = this.customerForm.get('emailGroup.confirmEmail');
    emailControl.valueChanges.subscribe(value => this.setMessage(emailControl, 'email'));
    emailConfirmControl.valueChanges.subscribe(value => this.setMessage(emailConfirmControl, 'confirmEmail'));
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
    this.setNotification('email');
  }

  setNotification(value: string){
    const phoneControl = this.customerForm.get('phone');
    if(value === 'mobile') {
      phoneControl.setValidators([Validators.minLength(10), Validators.required]);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  setMessage(c: AbstractControl, type: string):void {
    this.emailMessage = '';
    this.emailConfirmationMessage = '';
    console.log(this.customerForm.get('emailGroup').errors)
    if ((c.touched || c.dirty) && c.errors && type == 'email') {
      this.emailMessage = Object.keys(c.errors).map(
      key => {
            return this.emailMessage += this.validationMessage[key];
        }).join(' ');
    } else if ((c.touched || c.dirty) && c.errors && type == 'confirmEmail') {
      this.emailConfirmationMessage = Object.keys(c.errors).map(
        key => {
          return this.emailConfirmationMessage += this.validationMessage[key];
        }).join(' ');
    }
  }

}
