import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ViewShipmentComponent } from './admin/view/view-shipment.component';

const childRoutes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'view/:id', component: ViewShipmentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutingModule { }