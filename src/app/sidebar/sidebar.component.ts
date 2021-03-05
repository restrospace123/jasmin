import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from "../auth-service.service";
import { Router, ActivatedRoute, ParamMap,  NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  mode = 'side'
  opened = true;
  layoutGap = '70';
  fixedInViewport = true;
  response;

  constructor(private router: Router,private authService: AuthServiceService) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('currentUser');
      this.authService.logout().subscribe(result=>{
        if(result.status == 'loggedout success'){
          this.router.navigate(['']);
        }else{
          console.log("error logout");
        }
      });
  }

}
