import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from "../auth-service.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  formGroup: FormGroup;
  showMsg: boolean = false;
  constructor(private router: Router,private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.initForm();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  initForm(){
    this.formGroup = new FormGroup({
      student_name: new FormControl('',[Validators.required]),
      student_email: new FormControl('',[Validators.required]),
      student_mobile: new FormControl('',[Validators.required]),
      student_dob: new FormControl('',[Validators.required]),
      student_gender: new FormControl('',[Validators.required]),
      student_address: new FormControl('',[Validators.required]),
    });
  }
  onSubmit(){
    if(this.formGroup.valid){
      this.authService.addStudent(this.formGroup.value).subscribe(result=>{
        if(result.status == 'success'){
          this.router.navigate(['/students-list']);
          this.showMsg= true;
        }else{
           
        }
     });
    }
  }
  
}
