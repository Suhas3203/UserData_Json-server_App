import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SupportComponent } from './support/support.component';
import { LogoutComponent } from '../logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'aboutUs', component: AboutUsComponent },
      { path: 'support', component: SupportComponent },
    ],
  },
  {
    path: 'allUsers',
    canActivate: [],
    loadChildren: () =>
      import('../all-users/all-users.module').then((m) => m.AllUsersModule),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
