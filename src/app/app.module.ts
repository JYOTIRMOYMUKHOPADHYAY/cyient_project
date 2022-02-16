import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageConnectionsComponent } from './manage-connections/manage-connections.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
// import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ManageConnectionsComponent
  ],
  imports: [
    BrowserModule,
    LeafletModule,
    AppRoutingModule,
    HttpClientModule,
    // LeafletMarkerClusterModule

  ],
  exports:[
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
