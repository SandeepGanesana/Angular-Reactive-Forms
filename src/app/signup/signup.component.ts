import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

function matchEmail(c: AbstractControl):{ [key: string]: boolean } | null {
  const email = c.get('email');
  const confEmail = c.get('confirmEmail');
  if (email.pristine || confEmail.pristine) {
    return null;
  }
  if (email.value === confEmail.value) {
    return null;
  }
  return {match: true}
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
      }, { Validators: matchEmail }),
      sendCatalog: true,
      addressGroup: this.fb.group({
        addressType: ['home', [Validators.required]],
        street1: [''],
        street2: [''],
        city: [''],
        state: [''],
        zipcode: ['']
      })
    })
  }
  save() {
    console.log('submitted');
  }
}
