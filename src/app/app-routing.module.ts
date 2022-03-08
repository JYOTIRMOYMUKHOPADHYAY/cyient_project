import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardtilesComponent } from './dashboardtiles/dashboardtiles.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageConnectionsComponent } from './manage-connections/manage-connections.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard-tiles', component: DashboardtilesComponent },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./adminModule/admin.module')
        .then((m) => m.AdminModule)
        .catch((err) => console.log(err))
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
