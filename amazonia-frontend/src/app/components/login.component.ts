import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { AccountService } from '../account.service';
import { LoginResponse } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login$!: Promise<LoginResponse>
  loginForm!: FormGroup
  errorMessage$!: Observable<string>
  errorMessage!: string;
  KEY = "username"

  isLoading = false;

  fb = inject(FormBuilder)
  router = inject(Router)
  accountSvc = inject(AccountService)

  ngOnInit(): void {
    this.errorMessage$ = this.accountSvc.onErrorMessage;
    this.loginForm = this.fb.group({
      username: this.fb.control<string>('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+')]),
      password: this.fb.control<string>('', [ Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).*$') ])
    })
  }

  invalidField(ctrlName:string): boolean{
    return !!(this.loginForm.get(ctrlName)?.invalid && this.loginForm.get(ctrlName)?.dirty)
  }

  login() {
    this.isLoading = true;
    const username = this.loginForm.get('username')?.value
    const password = this.loginForm.get('password')?.value

    //the username and password are passed to loginSvc for loginGuard and loginGuardManager
    this.accountSvc.username = username
    this.accountSvc.password = password
    console.info('username: ', username)
    console.info('password: ', password)

    //Promise is used instead of observables as it doesn't require ongoing updates
    this.login$=firstValueFrom(this.accountSvc.login(username, password))
    this.login$.then((response) => {
      this.accountSvc.account_id = response.account_id

      this.router.navigate(['/dashboard', username])
    }).catch((error)=>{
  
      this.errorMessage = error.error;
      console.info('this.errorMessage is ' + this.errorMessage)
    });

  }

}
