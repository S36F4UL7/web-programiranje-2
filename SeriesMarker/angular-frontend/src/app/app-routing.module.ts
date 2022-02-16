import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SeriesComponent } from './series/series.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'series', component: SeriesComponent, canActivate: [AuthGuard],},
  { path: 'login', component: LoginComponent,},
  { path: '', redirectTo: '/series', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
