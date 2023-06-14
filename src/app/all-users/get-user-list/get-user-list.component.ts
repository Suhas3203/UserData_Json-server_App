import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FilteringDataPipe } from 'src/app/pipes/filtering-data.pipe';
import { UserServService } from 'src/app/user-serv.service';
import { userInterface } from 'src/app/userInterface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddNewComponent } from '../add-new/add-new.component';
import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { UpdateExistingUserComponent } from '../update-existing-user/update-existing-user.component';
import { GetAUserComponent } from '../get-auser/get-auser.component';

@Component({
  selector: 'app-get-user-list',
  templateUrl: './get-user-list.component.html',
  styleUrls: ['./get-user-list.component.css'],
})
export class GetUserListComponent implements OnInit {
  usersList!: userInterface[];
  dataSource!: MatTableDataSource<any>;
  inputForm!: FormGroup;
  userForEdit!: userInterface;
  p: number = 1;
  id: any;

  disabled = false;
  max = 100;
  min = 10;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  // value = '';

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'maidenName',
    'age',
    'gender',
    'email',
    'phone',
    'username',
    'password',
    'birthDate',
    'bloodGroup',
    'height',
    'weight',
    'actions',
  ];

  openDialogForDetails(id: number) {
    this.userService
      .getAUser(id)
      .toPromise()
      .then((result: any) => {
        this.userForEdit = result;

        console.log(this.userForEdit);
      });

    setTimeout(() => {
      const dialogRef = this.dialog.open(GetAUserComponent, {
        data: this.userForEdit,
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }, 1000);
  }

  openDialogForUpdate(id: number) {
    this.userService
      .getAUser(id)
      .toPromise()
      .then((result: any) => {
        this.userForEdit = result;

        console.log(this.userForEdit);
      });

    setTimeout(() => {
      const dialogRef = this.dialog.open(UpdateExistingUserComponent, {
        data: this.userForEdit,
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }, 3000);
  }

  openDialogForAdd() {
    console.log('Id at component ' + this.id);

    try {
      const dialogRef = this.dialog.open(AddNewComponent, { data: this.id });
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    } catch (err: any) {
      throwError('Error Occured' + err);
    }
  }

  deleteAUser(id: number) {
    if (window.confirm('Are You Sure to delete this record?') == true) {
      this.userService.deleteUser(id).subscribe((res) => {
        console.log('User Deleted ...!');
      });
      alert('User deleted successfully');
    }
  }
  newValue: any;
  getMaxValue(event: any) {
    this.newValue = event.target.value;
    console.log(this.newValue);
  }

  getAllFilter(event: any) {
    // const filterValue = (event.target as HTMLInputElement).value;

    // const fieldVal = (event.target as HTMLInputElement).name; // console.log(this.users)
    // debugger

    const filteredData = this.allDataFilterPipe.transform(
      this.usersList,
      this.inputForm,
      this.newValue
    );

    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserServService,
    private allDataFilterPipe: FilteringDataPipe,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddNewComponent>
  ) {
    this.inputForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      maidenName: new FormControl(''),
      age: new FormControl(''),
      gender: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      birthDate: new FormControl(''),
      bloodGroup: new FormControl(''),
      height: new FormControl(''),
      weight: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.usersList = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.id = this.usersList.length;
    });
  }
}
