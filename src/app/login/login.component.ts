import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from "../auth-service.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  isLogedIn: boolean = false;
  constructor(public router: Router,public authService: AuthServiceService) { }

  ngOnInit(): void { 
    this.initForm();
   }
  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    });
  }
  loginProcess(){
    if(this.formGroup.valid){
      console.log(this.formGroup.value);
      this.authService.login(this.formGroup.value).subscribe(result=>{
         if(result.status == 'success'){
           this.loginSuccess(result);
         }else{
          this.loginSuccess('Login Failed');
         }
      }, (err) => {
        this.loginSuccess(err);
      });
    }
  }
  loginSuccess(result){
    this.isLogedIn = true;
    localStorage.setItem('currentUser', result.token);
    this.router.navigate(['/home']);
  }
  loginFailuer(err: string){
    alert(err);
  }
  isLoggedIn(){
    if(localStorage.getItem('currentUser')){
      return true;
    }

    return false;
  }
  isLogged() {
    return this.isLogedIn;
  }
  getAuthToken(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.token;
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.formGroup.controls[controlName].hasError(errorName);
  }
}
