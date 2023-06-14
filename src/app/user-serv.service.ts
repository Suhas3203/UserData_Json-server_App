import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { userInterface } from './userInterface';

@Injectable({
  providedIn: 'root',
})
export class UserServService {
  myUrl = 'http://localhost:3000/users';
  users!: userInterface[];

  getAllUsers() {
    return this.http.get(this.myUrl);
  }

  addNewUser(user: any): Observable<any> {
    console.log('At Service');
    return this.http.post<userInterface>(this.myUrl, user);
  }

  getAUser(id: number) {
    return this.http.get(this.myUrl + '/' + id);
  }

  updateUser(user: userInterface): Observable<void> {
    this.getAllUsers().subscribe((result: any) => {
      this.users = result;
    });
    return this.http.put<void>(this.myUrl + '/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.http.delete<userInterface>(this.myUrl + '/' + id);
  }

  setToken(token: any) {
    localStorage.setItem('loginToken', JSON.stringify(token));
  }

  getToken() {
    return localStorage.getItem('loginToken');
  }

  isLoggedIn() {
    return this.getToken() != null;
  }

  logout() {
    localStorage.removeItem('loginToken');
    this.router.navigate(['/logout']);
  }

  isValid!: any;
  login(user: any): Observable<any> {
    console.log('this is here');
    this.isValid = this.users.find(
      (u) => u.email == user.email && u.password == user.password
    );

    console.log(this.isValid);
    return this.isValid;
  }

  constructor(private http: HttpClient, private router: Router) {
    this.getAllUsers().subscribe((result: any) => {
      this.users = result;
    });
  }
}
