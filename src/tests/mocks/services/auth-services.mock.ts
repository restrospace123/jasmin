import { Observable, of, throwError } from 'rxjs';


export class AuthServiceMock {

  redirectUrl: string;
  currentUser: string;



  response: string;
  

  login(loginData):Observable<any>{
     return of(true);
  }

}
