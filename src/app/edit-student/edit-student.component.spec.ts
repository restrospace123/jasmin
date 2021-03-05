import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EditStudentComponent } from './edit-student.component';
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

describe('EditStudentComponent', () => {
  let component: EditStudentComponent;
  let httpClient: HttpClientTestingModule;
  let httpTestingController: HttpTestingController;
  let creds: any;
  let err : any;
  let loginService: AuthServiceService;
  let fixture: ComponentFixture<EditStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStudentComponent ],
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
    fixture = TestBed.createComponent(EditStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpClient = TestBed.inject(HttpClientTestingModule);
    httpTestingController = TestBed.inject(HttpTestingController);
    loginService = TestBed.inject(AuthServiceService);
  });

  /**
   * 1- Should load component
   * 2- Should render input elements
   * 3- Form Validity & Input Validity
   * 4- Check error display or not
   * 5- Check student resgister server side
   */

  // 1
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // 2
  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;
    
    const nameInput = compiled.querySelector('input[id="student_name"]');
    const emailInput = compiled.querySelector('input[id="student_email"]');

    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
  });

  // 3
  it('should test form and input validity', () => {
    const name       = component.formGroup.controls.student_name;
    const email      = component.formGroup.controls.student_email;
    const mobile     = component.formGroup.controls.student_mobile;
    const dob        = component.formGroup.controls.student_dob;
    const gender     =  component.formGroup.controls.student_gender;
    const address    = component.formGroup.controls.student_address;

    expect(name.valid).toBeFalsy();
    expect(email.valid).toBeFalsy();
    expect(mobile.valid).toBeFalsy();
    expect(dob.valid).toBeFalsy();
    expect(gender.valid).toBeFalsy();
    expect(address.valid).toBeFalsy();

    name.setValue('Sanju Panikar');
    expect(name.valid).toBeTruthy();

    email.setValue('sanju@gmail.com');
    expect(email.valid).toBeTruthy();

    mobile.setValue('9109920813');
    expect(mobile.valid).toBeTruthy();

    dob.setValue('2021-11-05');
    expect(dob.valid).toBeTruthy();

    gender.setValue('Male');
    expect(gender.valid).toBeTruthy();

    address.setValue('abc');
    expect(address.valid).toBeTruthy();

    expect(component.formGroup.valid).toBeTruthy();
  });

  // 4
  it('should test input errors', () => {
    const nameInput = component.formGroup.controls.student_name;
    expect(nameInput.errors.required).toBeTruthy();

    nameInput.setValue('John Peter');
    expect(nameInput.errors).toBeNull();

    const emailInput = component.formGroup.controls.student_email;
    expect(emailInput.errors.required).toBeTruthy();

    emailInput.setValue('sanju@gmail.com');
    expect(emailInput.errors).toBeNull();
  });

  // 5
  it('Test student update, server side trigger', () => {
        creds = { 
          'id':           '1',
          'student_name': 'Sanju', 
          'student_email': 'Hello@gmail.com', 
          'student_mobile': '9109920813', 
          'student_dob': '05/11/1990', 
          'student_gender': 'Male', 
          'student_address': 'abc' 
          };

        loginService.editStudent(creds).subscribe(result=>{
          if(result.status == 'success'){
            expect(result.status).toEqual('success');
          }else{
          console.log('failed');
          expect(result.status).toEqual('');
          }
      }, (err) => {
        console.log(err);
      });

        const req = httpTestingController.expectOne(`${baseUrl}v1/edit-student`);

        expect(req.request.method).toEqual('PATCH');

        expect(req.cancelled).toBeFalse();

        req.flush({
          status: 'success'
        });
  });

});
