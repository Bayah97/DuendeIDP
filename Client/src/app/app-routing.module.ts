import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AuthGuard } from './authgard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RedirectServerComponent } from './redirect-server/redirect-server.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'redirect', component:RedirectServerComponent, canActivate:[AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  { path: 'auth-callback', component:AuthCallbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
