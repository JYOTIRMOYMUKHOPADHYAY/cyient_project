import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminDashboardComponent} from '../admin-dashboard/admin-dashboard.component';
import {GeoserverDataComponent} from '../geoserver-data/geoserver-data.component';
import {GeoserverMapComponent} from '../geoserver-map/geoserver-map.component';
import {HomeComponent} from '../home/home.component';
import {ManageConnectionsComponent} from '../manage-connections/manage-connections.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {AdminRoutingModule} from './admin-routing.module';
import {DragDropModule} from "@angular/cdk/drag-drop"
import {DragdropComponent} from "../dragdrop/dragdrop.component";
import {ListitemComponent} from '../dragdrop/listitem/listitem.component';
import { DashboardtilesComponent } from '../dashboardtiles/dashboardtiles.component';
import { ProjectHandelingComponent } from '../project-handeling/project-handeling.component';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { InputHandelingComponent } from '../input-handeling/input-handeling.component';
import { ConnectionHandelingComponent } from '../connection-handeling/connection-handeling.component';
import { AddEditConnectionComponent } from '../add-edit-connection/add-edit-connection.component';

@NgModule({
  declarations: [
    HomeComponent,
    ManageConnectionsComponent,
    AdminDashboardComponent,
    SidebarComponent,
    NavbarComponent,
    GeoserverDataComponent,
    GeoserverMapComponent,
    DragdropComponent,
    ListitemComponent,
    DashboardtilesComponent,
    ProjectHandelingComponent,
    CreateProjectComponent,
    InputHandelingComponent,
    ConnectionHandelingComponent,
    AddEditConnectionComponent
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule, ReactiveFormsModule, DragDropModule],
  providers: [],
})
export class AdminModule {
}
