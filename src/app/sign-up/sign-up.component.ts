import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  registrationForm !: FormGroup;

constructor(private fb: FormBuilder) { }

ngOnInit() {
this.registrationForm = this.fb.group({
firstName: ['', Validators.required],
lastName: ['', Validators.required],
email: ['', [Validators.required, Validators.email]],
mobileNumber: ['', Validators.required],
age: ['', Validators.required],
state: ['', Validators.required],
country: ['', Validators.required],
address: ['', Validators.required],
});
}

countries = [];

states = [];

onSubmit() {
console.log(this.registrationForm.value);
}

get firstName() {
return this.registrationForm.get('firstName');
}

get lastName() {
return this.registrationForm.get('lastName');
}

get email() {
return this.registrationForm.get('email');
}

get mobileNumber() {
return this.registrationForm.get('mobileNumber');
}

get age() {
return this.registrationForm.get('age');
}

get state() {
return this.registrationForm.get('state');
}

get country() {
return this.registrationForm.get('country');
}

get address() {
return this.registrationForm.get('address');
}
}
