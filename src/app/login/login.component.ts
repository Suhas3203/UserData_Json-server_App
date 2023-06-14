import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserServService } from '../user-serv.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData!: FormGroup;

  showToaster() {
    alert('Invalid Credentials...!');
    this.toaster.error('Invalid Credentials...!');
  }

  onSubmit() {
    console.log(this.loginData.value);

    if (this.userService.login(this.loginData.value) != undefined) {
      this.userService.setToken('userLogin');
      this.router.navigate(['dashboard']);
    } else {
      this.showToaster();
    }
  }

  constructor(
    private router: Router,
    private userService: UserServService,
    private toaster: ToastrService
  ) {
    this.loginData = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }
}
