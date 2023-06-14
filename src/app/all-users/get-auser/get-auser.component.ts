import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { userInterface } from 'src/app/userInterface';

@Component({
  selector: 'app-get-auser',
  templateUrl: './get-auser.component.html',
  styleUrls: ['./get-auser.component.css'],
})
export class GetAUserComponent {
  constructor(
    public dialogRef: MatDialogRef<GetAUserComponent>,
    @Inject(MAT_DIALOG_DATA) public person: userInterface
  ) {}
}
