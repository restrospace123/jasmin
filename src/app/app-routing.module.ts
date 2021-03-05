import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth-guard.service';

import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { StudentsComponent } from './students/students.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  { path:'',component:LoginComponent },
  { path:'home',component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'add-student', component: AddStudentComponent, canActivate: [AuthGuardService]  },
  { path: 'edit-student', component: EditStudentComponent, canActivate: [AuthGuardService]  },
  { path: 'delete-student', component: EditStudentComponent, canActivate: [AuthGuardService]  },
  { path: 'students-list', component: StudentsComponent, canActivate: [AuthGuardService]  },
  { path: 'logout', component: SidebarComponent, canActivate: [AuthGuardService]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
