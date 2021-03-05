import { Student } from '../shared/student';
import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthServiceService } from "../auth-service.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
 
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  StudentData: any = [];
  showMsg: boolean = false;
  form: FormGroup;
  dataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'student_name', 'student_email', 'student_mobile', 'action'];

  constructor(private router: Router,private authService: AuthServiceService, private dialog: MatDialog) { 
     this.authService.studentList().subscribe(
       data => {
          
          this.StudentData = data;
          this.dataSource = new MatTableDataSource<Student>(this.StudentData.data);
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
          }, 0);

       })
  }

  ngOnInit():void { }

  studentDelete(id){
      if(confirm("Are you sure you want to delete this student?")){
          this.authService.deleteStudent(id).subscribe(result=>{
            if(result.success){
            alert("Student Deleted!!");
            }else{
              
            }
          });
      }
  }

  openDialog() {

  }

}
