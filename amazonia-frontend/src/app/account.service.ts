import { Injectable, inject } from "@angular/core";
import { Observable, Subject, catchError, filter, lastValueFrom, map, tap, throwError } from "rxjs";
import { ErrorResponse, LoginResponse, UserData } from "./models";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";


const URL_API_AMAZONIA_SERVER = '/api'

@Injectable()
export class AccountService {

  onLoginRequest = new Subject<LoginResponse>()
  onErrorMessage = new Subject<string>()
  isLoggedInChanged = new Subject<boolean>()

  http=inject(HttpClient)
  router = inject(Router)

  username = "";
  password = "";
  parsedUsername = "";
  queryParams: any;
  account_id = ""
  KEY = "username"
  key!: string


  hasLogin(): boolean {
    if(this.username&&this.password)
      localStorage.setItem(this.KEY, this.username)
      const isLoggedIn = !!(this.username && this.password);
      this.isLoggedInChanged.next(isLoggedIn);
    return isLoggedIn;
 
  }

  logout(): void {
    localStorage.removeItem(this.KEY);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.KEY) !== null;
  }

  
//   getUserData(username:string): Promise<UserData> {

//     const queryParams = new HttpParams()
//         .set('username', username)

//     console.info('>>>>>>getting User data from server...')
//     return lastValueFrom(
//       this.http.get<UserData>(`${URL_API_AMAZONIA_SERVER}/getuser`, { params: queryParams })
//         .pipe(
//           tap(resp => this.onUserDataRequest.next(resp)),
//           map(resp => ({ account_id: resp.name, name: resp.name, password: resp.password, username: resp.username, 
//                         address:resp.address,mobile_no: resp.mobile_no,
//                         nationality:resp.nationality, date_of_birth:resp.date_of_birth
//                       }))
//         )
//     )
// }


  login(username: string, password: string): Observable<LoginResponse> {

    const form = new HttpParams()
      .set("username", username)
      .set("password", password)

    const headers = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded")

    return  this.http.post<LoginResponse>(`${URL_API_AMAZONIA_SERVER}/login`, form.toString(), {headers}).pipe(
      catchError(error => {
        let errorMessage = 'An error occurred during login: ' + error.message;
        console.error(errorMessage);
        
        if (error instanceof HttpErrorResponse && error.status === 500) {
          const serverError = error.error.error; 
          errorMessage = '>>>Server error: ' + serverError;
        }
        
        this.onErrorMessage.next(errorMessage);
        return throwError(() => ({ error: errorMessage }));
      }),
      filter((response) => response !== null), 
      //the fired onLoginRequest.next is received in dashboard component's ngOnit 
      tap(response => this.onLoginRequest.next(response))
    );
  }

}
