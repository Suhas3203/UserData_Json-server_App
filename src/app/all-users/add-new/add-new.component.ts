import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserServService } from 'src/app/user-serv.service';
import { userInterface } from 'src/app/userInterface';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css'],
})
export class AddNewComponent {
  addUserForm!: FormGroup;
  getId!: any[];
  addDataForm!: userInterface;

  genders: string[] = ['male', 'female'];
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServService,
    private router: Router,
    public dialogRef: MatDialogRef<AddNewComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) {
    // this.userService.getAllUsers().subscribe((user: any) => {
    //   this.getId = user;
    // });
    // console.log(this.getId.length);
  }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      id: [''],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      maidenName: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+.[a-zA-Z]{2,})$'
          ),
        ],
      ],
      phone: ['', Validators.required],
      username: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9_]{5,20}$')],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&]).{8,32}$'
          ), //'^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ){8,16}$'
        ],
      ],
      birthDate: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.addDataForm = {
      id: this.id + 1,
      firstName: this.addUserForm.controls['firstName'].value,
      lastName: this.addUserForm.controls['lastName'].value,
      maidenName: this.addUserForm.controls['maidenName'].value,
      age: this.addUserForm.controls['age'].value,
      gender: this.addUserForm.controls['gender'].value,
      email: this.addUserForm.controls['email'].value,
      phone: this.addUserForm.controls['phone'].value,
      username: this.addUserForm.controls['username'].value,
      password: this.addUserForm.controls['password'].value,
      birthDate: this.addUserForm.controls['birthDate'].value,
      bloodGroup: this.addUserForm.controls['bloodGroup'].value,
      height: this.addUserForm.controls['height'].value,
      weight: this.addUserForm.controls['weight'].value,
    };
    //30 +1

    if (this.addUserForm.valid) {
      console.log('from component to service');
      this.userService.addNewUser(this.addDataForm).subscribe((result) => {
        console.log('this record saved' + result);
      });

      this.dialogRef.close();
      this.router.navigate(['/dashboard/allUsers']);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
