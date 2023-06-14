import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserServService } from 'src/app/user-serv.service';
import { userInterface } from 'src/app/userInterface';

@Component({
  selector: 'app-update-existing-user',
  templateUrl: './update-existing-user.component.html',
  styleUrls: ['./update-existing-user.component.css'],
})
export class UpdateExistingUserComponent implements OnInit {
  allUsers!: any;
  updateForm!: FormGroup;
  userForEdit!: userInterface;

  genders: string[] = ['male', 'female'];
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  onSubmit() {
    this.userService.updateUser(this.data).subscribe(
      () => console.log('User updated successfully'),
      (error) => console.error(`Failed to update user: ${error}`)
    );

    this.dialogRef.close();
    this.router.navigate(['/dashboard/allUsers']);
  }

  onCancel() {
    this.dialogRef.close();
  }

  getId!: number;

  constructor(
    private userService: UserServService,
    private router: Router,
    public dialogRef: MatDialogRef<UpdateExistingUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: userInterface
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    // this.updateForm = new FormGroup({
    //   id: new FormControl(''),
    //   firstName: new FormControl(''),
    //   lastName: new FormControl(''),
    //   maidenName: new FormControl(''),
    //   age: new FormControl(''),
    //   gender: new FormControl(''),
    //   email: new FormControl(''),
    //   username: new FormControl(''),
    //   password: new FormControl(''),
    //   birthDate: new FormControl(''),
    //   bloodGroup: new FormControl(''),
    //   height: new FormControl(''),
    //   weight: new FormControl(''),
    // });
    // this.getId = this.userService.getIdForEdit();
    // this.userService
    //   .getAUser(this.getId)
    //   .toPromise()
    //   .then((result: any) => {
    //     this.userForEdit = result;
    //     Object.assign(this.userForEdit, result);
    //     console.log(this.userForEdit);
    //     setTimeout(() => {
    //     }, 7000);
    //     this.updateForm = new FormGroup({
    //       id: new FormControl(this.userForEdit.id),
    //       firstName: new FormControl(this.userForEdit.firstName),
    //       lastName: new FormControl(this.userForEdit.lastName),
    //       maidenName: new FormControl(this.userForEdit.maidenName),
    //       age: new FormControl(this.userForEdit.age),
    //       gender: new FormControl(this.userForEdit.gender),
    //       email: new FormControl(this.userForEdit.email),
    //       username: new FormControl(this.userForEdit.username),
    //       password: new FormControl(this.userForEdit.password),
    //       birthDate: new FormControl(this.userForEdit.birthDate),
    //       bloodGroup: new FormControl(this.userForEdit.bloodGroup),
    //       height: new FormControl(this.userForEdit.height),
    //       weight: new FormControl(this.userForEdit.weight),
    //     });
    //   });
    // setTimeout(() => {}, 5000);
  }
}
