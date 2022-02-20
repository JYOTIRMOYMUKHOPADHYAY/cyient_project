import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { GeoserverDataComponent } from '../geoserver-data/geoserver-data.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  {
    path: '',
    // runGuardsAndResolvers: "always",
    component: HomeComponent,
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
      },
      {
        path: 'geoData',
        component: GeoserverDataComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
