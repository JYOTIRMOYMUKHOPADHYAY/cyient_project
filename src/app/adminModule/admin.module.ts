import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { GeoserverDataComponent } from '../geoserver-data/geoserver-data.component';
import { GeoserverMapComponent } from '../geoserver-map/geoserver-map.component';
import { HomeComponent } from '../home/home.component';
import { ManageConnectionsComponent } from '../manage-connections/manage-connections.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminRoutingModule } from './admin-routing.module';
@NgModule({
  declarations: [
    HomeComponent,
    ManageConnectionsComponent,
    AdminDashboardComponent,
    SidebarComponent,
    NavbarComponent,
    GeoserverDataComponent,
    GeoserverMapComponent
  ],
  imports: [AdminRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
})
export class AdminModule {}
