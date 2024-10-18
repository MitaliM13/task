import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './guards/auth.guard';
import { InsightModule } from './insight/insight.module';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  {path: 'contact', component: ContactComponent},
  {path: 'about', component: AboutComponent},
  {path: 'logout', component: LogoutComponent},
  { path: 'insight', loadChildren: () => import('./insight/insight.module').then(m => m.InsightModule) },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
