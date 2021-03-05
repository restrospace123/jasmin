import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from "../auth-service.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../shared/student';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  StudentData: any = [];
  dataSource: MatTableDataSource<Student>;
  formGroup: FormGroup;
  showMsg: boolean = false;
  id = '';

  constructor(private activateRoute: ActivatedRoute, private router: Router, private authService: AuthServiceService) { 
      // Get Id from url
      this.activateRoute.queryParams.subscribe(params => {
        this.id = params['id'];
      });

      this.authService.getStudent(this.id).subscribe(
       data => {
          this.StudentData = data.data;
      })
  }

  ngOnInit(): void {
    this.initForm();
    this.getStudent();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  getStudent(){

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
  onSubmit(id){
    this.formGroup.value.id = id;

    if(this.formGroup.valid){
      this.authService.editStudent(this.formGroup.value).subscribe(result=>{
        this.router.navigate(["/students-list"]);
     });
    }
  }

}
