import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-warningpage',
  templateUrl: './warningpage.component.html',
  styleUrls: ['./warningpage.component.css']
})
export class WarningpageComponent implements OnInit {

  router = inject(Router)
  accountSvc = inject(AccountService)

  username = ''
  ngOnInit(): void {

      this.username = this.accountSvc.username;
  }

}
