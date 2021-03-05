import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseUrl, rootBaseUrl } from 'src/environments/environment';

import { Student } from './shared/student'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  redirectUrl: string;
  currentUser: string;
  response: string;

  constructor(public http:HttpClient) { }

  header = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*, http://localhost:4200',
    'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
 });

  login(data):Observable<any>{
      return this.http.post(`${rootBaseUrl}/api/login`, data).pipe(
        catchError(this.errorMgmt)
      );
  }

  logout():Observable<any>{
    return this.http.get(`${baseUrl}v1/logout`, { headers: this.header }).pipe(
      catchError(this.errorMgmt)
    );
  }

  studentList():Observable<any>{
    this.setHeader();
    return this.http.get(`${baseUrl}v1/list-students`, { headers: this.header }).pipe(
      catchError(this.errorMgmt)
    );
  }

  getStudent(data):Observable<any>{
    return this.http.get(`${baseUrl}v1/get-student?id=${data}`, { headers: this.header }).pipe(
      catchError(this.errorMgmt)
    );
  }

  addStudent(data: Student):Observable<any>{
    return this.http.post(`${baseUrl}v1/add-student`, data, { headers: this.header }).pipe(
      catchError(this.errorMgmt)
    );
  }

  editStudent(data):Observable<any>{
    return this.http.patch(`${baseUrl}v1/edit-student`, data, { headers: this.header }).pipe(
      catchError(this.errorMgmt)
    );
  }

  deleteStudent(id):Observable<any>{
    return this.http.delete(`${baseUrl}v1/delete-student?id=${id}`, { headers: this.header }).pipe(
      catchError(this.errorMgmt)
    );
  }

  setHeader(){
      if(localStorage.getItem('currentUser')){
        let token = localStorage.getItem('currentUser');
        this.header = new HttpHeaders({ 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*, http://localhost:4200',
          'Authorization': 'Bearer ' + token
        });
      }else{
        return 'empty';
      }
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    console.log('error',error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    throw new Error("my error message"+errorMessage);
    console.log(error.message);
    return throwError(errorMessage);
  }
}
