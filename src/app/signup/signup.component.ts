import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { 'match': true };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  requestForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.requestForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(6)]],
      last_name: ['', [Validators.required]],
      emailGroup: this.fb.group({
        email: ['', [Validators.email, Validators.required]],
        confirmEmail: ['', [Validators.email, Validators.required]]
      }, { validator: emailMatcher }),
      sendCatalog: true,
      addressGroup: this.fb.array([ this.buildAddress() ])  // Call Refactor Method ==> this.buildAddress()
    })
  }
  save() {
    console.log(this.requestForm.controls['addressGroup']);
    console.log('submitted');
  }

  buildAddress(): FormGroup { //Refactor create a method
    return this.fb.group({
      addressType: ['home', Validators.required],
      street1: ['', Validators.required],
      street2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(7)]]
    })
  }

  get addressGroup(): FormArray{
    return <FormArray>this.requestForm.get('addressGroup');
  }

  addAddress(): void {
    this.addressGroup.push(this.buildAddress());
  }
  removeAddress(id: number) {
    this.addressGroup.removeAt(id);
  }
}
