import { Injectable, inject } from "@angular/core";
import { Observable, Subject, catchError, filter, tap, throwError } from "rxjs";
import { ErrorResponse, LoginResponse } from "./models";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";


const URL_API_AMAZONIA_SERVER = 'http://localhost:8080/api'

@Injectable()
export class AccountService {

  onLoginRequest = new Subject<LoginResponse>()
  onErrorMessage = new Subject<string>()
  isLoggedInChanged = new Subject<boolean>()

  http=inject(HttpClient)
  router = inject(Router)

  username = "";
  password = "";
  queryParams: any;
  account_id = ""
  name = ""
  role = ""
  KEY = "username"

  hasLogin(): boolean {
    if(this.username&&this.password)
      localStorage.setItem(this.KEY, this.username)
      const isLoggedIn = !!(this.username && this.password);
      this.isLoggedInChanged.next(isLoggedIn);
    return isLoggedIn;
 
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.KEY) !== null;
  }

  login(username: string, password: string): Observable<LoginResponse> {

    const form = new HttpParams()
      .set("username", username)
      .set("password", password)

    const headers = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded")

    return this.http.post<LoginResponse>(`${URL_API_AMAZONIA_SERVER}/login`, form.toString(), {headers}).pipe(
      catchError(error => {
        let errorMessage = 'An error occurred during login: ' + error.message;
        console.error(errorMessage);
        
        if (error instanceof HttpErrorResponse && error.status === 500) {
          const serverError = error.error.error; 
          errorMessage = serverError;
        }
        
        this.onErrorMessage.next(errorMessage);
        return throwError(() => ({ error: errorMessage }));
      }),
      //the fired onLoginRequest.next is received in dashboard component's ngOnit 
      tap(response => {
        this.username = response.username;
        this.account_id = response.account_id;
        this.name = response.name;
        this.role = response.role;
        this.onLoginRequest.next(response);
      })
    );
  }

}
