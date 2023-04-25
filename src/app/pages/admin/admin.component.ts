import { Component, OnInit } from '@angular/core';
import { ShipmentsService } from '../../services/shipments.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public shipments: any[] = [];
  public customers: any[] = [];
  public routes: any[] = [];
  public vehicleOperators: any[] = [];
  public vehicleTypes: any[] = [];
  public totalShipments: number = 0;
  public page: number = 1;

  public shipmentForm = this.fb.group({
    customer: ['', [Validators.required]],
    customer_route: [0, Validators.required],
    price: ['', Validators.required],
    points_information: ['', Validators.required],
    operator: ['', Validators.required],
    tabs: ['', Validators.required],
    vehicle: [0, Validators.required],
    vehicle_operator: ['', Validators.required]
  });
  constructor(
    private shipmentsService: ShipmentsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadShipments();
    this.getCustomers();
    this.getRoutes();
    this.getVehicleOperators();
    this.getVehicleType();
  }
  loadShipments() {
    this.shipmentsService.loadShipments(this.page).subscribe((resp) => {
      console.log(resp);
      this.shipments = resp.results;
      this.totalShipments = resp.count;
    });
  }

  createShip() {
    this.shipmentsService.create(this.shipmentForm.value)
    .subscribe((resp) => {
      console.log(resp);
    })
  }

  getCustomers() {
    this.shipmentsService.getCustomers()
    .subscribe((resp: any) => {
      this.customers = resp.results;
    })
  }
  getRoutes() {
    this.shipmentsService.getRoutes()
    .subscribe((resp: any) => {
      this.routes = resp.results;
    })
  }

  getVehicleOperators() {
    this.shipmentsService.getVehicleOperators()
    .subscribe((resp: any) => {
      this.vehicleOperators = resp.results;
    })
  }
  getVehicleType() {
    this.shipmentsService.getTypeVehicle()
    .subscribe((resp: any) => {
      this.vehicleTypes = resp;
    })
  }
  changePage( page: number) {
    this.page += page;
    if ( this.page < 0 ) {
      this.page = 0;
    } else if ( this.page >= this.totalShipments ) {
      this.page -= page; 
    }

    this.loadShipments();
  }

  convertF(value: number){
    value = value * 9.0 / 5.0 + 32;
    return value;
  }

}
