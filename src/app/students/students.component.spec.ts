import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { StudentsComponent } from './students.component';
import { SidebarComponent } from '../../app/sidebar/sidebar.component';

import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Injector } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AuthServiceService } from '../auth-service.service';

import{ BrowserModule, By}from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

import {MatNativeDateModule} from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
import { baseUrl, rootBaseUrl } from 'src/environments/environment';

fdescribe('StudentComponent', () => {
  let component: StudentsComponent;
  let httpClient: HttpClientTestingModule;
  let httpTestingController: HttpTestingController;
  let creds: any;
  let err : any;
  let loginService: AuthServiceService;
  let fixture: ComponentFixture<StudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserModule,
        MatCheckboxModule,
        MatDialogModule,
        MatDividerModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatNativeDateModule,
        MatTableModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatPaginatorModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        MatDatepickerModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpClient = TestBed.inject(HttpClientTestingModule);
    httpTestingController = TestBed.inject(HttpTestingController);
    loginService = TestBed.inject(AuthServiceService);
  });

  /**
   * 1- Should Load Component
   * 2- Get Students
   * 3- List Students
   */

  // 1
  it('should create', () => {
    expect(component).toBeTruthy();
  });

 

  // 5
  it('Test get student, server side trigger', () => {

        loginService.getStudent(1).subscribe(result=>{
          if(result.status == 'success'){
            expect(result.status).toEqual('success');
          }else{
          console.log('failed');
          expect(result.status).toEqual('');
          }
      }, (err) => {
        console.log(err);
      });

        const req = httpTestingController.expectOne(`${baseUrl}v1/get-student?id=1`);

        expect(req.request.method).toEqual('GET');

        expect(req.cancelled).toBeFalse();

        req.flush({
          status: 'success'
        });
  });

    // 6
    it('Test list student, server side trigger', () => {

        loginService.studentList().subscribe(result=>{

          if(result.status == 'success'){
            expect(result.status).toEqual('success');
          }else{

          console.log('failed');
          expect(result.status).toEqual('');
          }
      }, (err) => {

        console.log(err);
      });

      const req = httpTestingController.match(`${baseUrl}v1/list-students`);

        expect(req[1].request.method).toEqual('GET');

        expect(req[1].cancelled).toBeFalse();

        req[0].flush([]);
        req[1].flush({
          status: 'success'
        });
  });

      // 6
      it('Test delete student, server side trigger', () => {

        loginService.deleteStudent(1).subscribe(result=>{

          if(result.status == 'success'){
            expect(result.status).toEqual('success');
          }else{

          console.log('failed');
          expect(result.status).toEqual('');
          }
      }, (err) => {

        console.log(err);
      });

      const req = httpTestingController.expectOne(`${baseUrl}v1/delete-student?id=1`);

        
      expect(req.cancelled).toBeFalse();

      req.flush({
        status: 'success'
      });
  });

});
