import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewShipmentComponent } from './admin/view/view-shipment.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AdminComponent,
    PagesComponent,
    ViewShipmentComponent,
  ],
  exports: [
    AdminComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    GoogleMapsModule
  ]
})
export class PagesModule { }