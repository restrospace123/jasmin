import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Injector } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthServiceService } from '../auth-service.service';

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import{ BrowserModule, By}from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

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

describe('LoginComponent', () => {
  let httpClient: HttpClientTestingModule;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: AuthServiceService;
  let el: HTMLElement;

  let httpTestingController: HttpTestingController;
  let creds: any;
  let err : any;
  let headers: HttpHeaders;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  const mockToken = {
    headerName: 'x-fake',
    token: 'fake'
  };
  const mockTokenService = {
    findTokenData: () => {
      return of(mockToken);
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
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
         BrowserAnimationsModule
        ],
      declarations: [LoginComponent],
      providers:[
        AuthServiceService
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpClient = TestBed.inject(HttpClientTestingModule);
    httpTestingController = TestBed.inject(HttpTestingController);
    loginService = TestBed.inject(AuthServiceService);
  });

  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });

  it('should be created', () => {
    expect(loginService).toBeTruthy();
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('Should set submitted to true', async(() => {
    component.loginProcess();
    expect(component.loginProcess).toBeTruthy();
 }));

  it('check username', () => {
    let pwd = component.formGroup.controls['username'];
    expect(pwd.errors['required']).toBeTruthy();
    pwd.setValue('');

    expect(pwd.errors).toBeTruthy(); 
  });

  it('check password', () => {
    let pwd = component.formGroup.controls['password'];
    expect(pwd.errors['required']).toBeTruthy();
    pwd.setValue('1234');

    expect(pwd.errors['minlength']).toBeTruthy(); 
  });

  it('Form should be valid', async(()=> {
    component.formGroup.controls['username'].setValue('sanjuict');
    component.formGroup.controls['password'].setValue('Hello@123');
    expect(component.formGroup.valid).toBeTruthy();
  }));

  it('check login processs called', () => {
    fakeAsync(() =>{
      fixture.detectChanges();
      spyOn(component,'loginProcess');
      el=fixture.debugElement.query(By.css('Login')).nativeElement;
      el.click();
      expect(component.loginProcess).toHaveBeenCalledTimes(1);
    })
  });

  it('Check Auth login return', () => {

          component.formGroup.controls['username'].setValue('sanjuict');
          component.formGroup.controls['password'].setValue('Hello@123');
     
          creds = { 'username': 'sanjuict', 'password': 'Hello@123' };

          loginService.login(creds).subscribe(result=>{
            if(result.status == 'success'){
              localStorage.setItem('currentUser', result.token);

              expect(localStorage.getItem('currentUser')).toEqual('123456789');

              // expect('http://localhost:8000/home').toMatch('/home');
            }else{
             console.log('failed');
            }
         }, (err) => {
           console.log(err);
         });

          const req = httpTestingController.expectOne(`${rootBaseUrl}/api/login`);

          expect(req.request.method).toEqual('POST');

          expect(req.cancelled).toBeFalse();

          req.flush({
            status: 'success',
            token: '123456789',
            name: 'Sanju Panikar'
          });
  });

  it('check is logged in false', () => {
      if(localStorage.getItem('currentUser')){
        expect(component.isLoggedIn()).toBeTruthy();
      }else{
        expect(component.isLoggedIn()).toBeFalsy();
      }
  });

  it('check is logged out', () => {
        creds = { 'username': 'sanjuict', 'password': 'Hello@123' };

        loginService.logout().subscribe(result=>{
          if(result.status == 'loggedout success'){
            localStorage.removeItem('currentUser');

            expect(localStorage.getItem('currentUser')).toBeNull('');

            // expect('http://localhost:8000/home').toMatch('/home');
          }else{
          console.log('failed');
          }
      }, (err) => {
        console.log(err);
      });

        const req = httpTestingController.expectOne(`${rootBaseUrl}/api/logout`);

        expect(req.request.method).toEqual('GET');

        expect(req.cancelled).toBeFalse();

        req.flush({
          status: 'loggedout success'
        });
  });

});




