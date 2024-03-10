import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { AccountService } from '../account.service';
import { LoginResponse } from '../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  accountSvc = inject(AccountService)
  title = inject(Title)

  username!: string
  name!: string
  role!: string
  accountId!: string

  ngOnInit():void{
    this.title.setTitle(`Account: ${this.accountSvc.username}`)
    this.username = this.accountSvc.username
    this.accountId = this.accountSvc.account_id
    this.name = this.accountSvc.name
    this.role = this.accountSvc.role
  }
}
