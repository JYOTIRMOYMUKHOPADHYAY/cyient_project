import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminDashboardComponent} from '../admin-dashboard/admin-dashboard.component';
import {GeoserverDataComponent} from '../geoserver-data/geoserver-data.component';
import {HomeComponent} from '../home/home.component';
import {DragdropComponent} from '../dragdrop/dragdrop.component';
import { DashboardtilesComponent } from '../dashboardtiles/dashboardtiles.component';

const routes: Routes = [
  {
    path: '',
    // runGuardsAndResolvers: "always",
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardtilesComponent,
      },
      {
        path: 'geoData',
        component: GeoserverDataComponent,
      },
      {
        path: 'dragdrop',
        component: DragdropComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
