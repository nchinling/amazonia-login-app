import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // isCollapsed = true;
  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  
  isLoggedIn$!: Observable<boolean>

  private isLoggedInSubscription: Subscription | undefined;
  KEY = "username"
  username = ''
  queryParams: any

  router = inject(Router)
  accountSvc = inject(AccountService)


  ngOnInit(): void {
    this.isLoggedInSubscription = this.accountSvc.isLoggedInChanged.subscribe(isLoggedIn => {
      this.isLoggedIn$ = of(isLoggedIn);
      console.info('User is logged in: ' + isLoggedIn);
    });
    
    this.username = this.accountSvc.username
    this.queryParams = this.accountSvc.queryParams
    console.info('the parsedUsername is' + this.username)
    console.info('the queryParams is' + this.queryParams)


  }

  logout(): void {
    // Clear the stored credentials 
    localStorage.removeItem(this.KEY);
    this.isLoggedIn$ = of(false);
    
    // reset 
    this.accountSvc.username=''
    this.accountSvc.password=''
    this.accountSvc.key=''
    this.router.navigate(['/'])
  }

  // ngAfterViewInit(): void{
  //   this.isLoggedIn$ = this.accountSvc.isLoggedInChanged
  //   this.parsedUsername = this.accountSvc.parsedUsername
  //   this.queryParams = this.accountSvc.queryParams
  //   console.info('the parsedUsername is' + this.parsedUsername)
  //   console.info('the queryParams is' + this.queryParams)

  // }

  // ngOnChanges(): void{
  //   this.isLoggedIn$ = this.accountSvc.isLoggedInChanged
  //   this.parsedUsername = this.accountSvc.parsedUsername
  //   this.queryParams = this.accountSvc.queryParams
  //   console.info('the parsedUsername is' + this.parsedUsername)
  //   console.info('the queryParams is' + this.queryParams)

  // }

  ngOnDestroy(): void {
    if (this.isLoggedInSubscription) {
      this.isLoggedInSubscription.unsubscribe();
    }
  }
}
