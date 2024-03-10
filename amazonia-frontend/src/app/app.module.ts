import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { DashboardComponent } from './components/dashboard.component';
import { ManagerpageComponent } from './components/managerpage.component';
import { MainComponent } from './components/main.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar.component';
import { loginGuard, loginGuardManager } from './utils';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountService } from './account.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WarningpageComponent } from './components/warningpage.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent, title: 'Welcome to Amazonia' },
  { path: 'login', component: LoginComponent, title: 'Log In' },
  { path: 'dashboard/:username', component: DashboardComponent, title: 'DashBoard', canActivate: [loginGuard]},
  { path: 'manager-page/:username', component: ManagerpageComponent, title: 'Manager View', canActivate: [loginGuardManager]},
  { path: 'restricted-warning', component: WarningpageComponent, title: 'Warning', canActivate: [loginGuard]},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    DashboardComponent,
    ManagerpageComponent,
    NavbarComponent,
    WarningpageComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule, HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: true}),
    NgbModule,
  ],
  exports: [RouterModule],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
