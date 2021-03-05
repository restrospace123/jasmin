import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap,  NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demotest';

  constructor(private router: Router) { }
}
