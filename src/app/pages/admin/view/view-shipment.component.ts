import { Component, OnInit } from '@angular/core';
import { ShipmentsService } from '../../../services/shipments.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, map } from 'rxjs';

interface cords {
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-view-shipment',
  templateUrl: './view-shipment.component.html',
  styleUrls: ['./view-shipment.component.css'],
})
export class ViewShipmentComponent implements OnInit {
  public shipment: any;
  public isLoad: boolean = false;
  public markers: any[] = [];
  public locations: any[] = [];
  public cords: cords[] = [];

  public shipmentForm = this.fb.group({
    customer_name: ['', Validators.required],
    customer_route_name: ['', [Validators.required]],
    cost: ['', Validators.required],
    customer_invoice: ['', Validators.required ],
    vehicle_operator_name: ['', Validators.required],
    vehicle_one_name: [''],
    dolly: [''],
    trailer_one_name: ['', Validators.required],
    tab: ['', Validators.required],
    temperature: ['', Validators.required],
    temperatureF: ['']
  });

  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  constructor(
    private shipmentsService: ShipmentsService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.loadShipment(id);
    });
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: Number(this.cords[0].latitude),
        lng: Number(this.cords[0].longitude),
      };
      this.addMarker();
    });
  }

  getLatLongLocation() {
    this.shipmentsService
      .getLocation(this.shipment.customer)
      .subscribe((resp: any) => {
        this.cords = [{ 
          latitude: resp[0].latitude,
          longitude: resp[0].longitude
        }];
    });
  }
  loadShipment(id: number) {
    this.shipmentsService
      .loadShipment(id)
      .pipe(delay(100))
      .subscribe((resp: any) => {
        this.isLoad = true;
        this.shipment = resp[0];
        console.log(this.shipment);
        this.shipmentForm.patchValue({
          customer_name: this.shipment.customer_name,
          customer_route_name: this.shipment.customer_route_name,
          customer_invoice: this.shipment.customer_invoice,
          cost: this.shipment.cost,
          dolly: this.shipment.dolly,
          vehicle_operator_name: this.shipment.vehicle_operator_name,
          vehicle_one_name: `${this.shipment.vehicle_type} (placa: ${this.shipment.plate_vehicle})`,
          trailer_one_name: `${this.shipment.trailer_one_name} (placa: ${this.shipment.plate_trailer_one? this.shipment.plate_trailer_one : ''})`,
          tab: this.shipment.tab,
          temperature:  `${this.shipment.temperature} °C   `,
          temperatureF:  `${this.convertF(this.shipment.temperature)} °F   `,


        });
        this.getLatLongLocation();
      });
  }

  convertF(value: number){
    value = value * 9.0 / 5.0 + 32;
    return value;
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat,
        lng: this.center.lng,
      },
      label: {
        color: 'red',
        text: `Punto ${this.markers.length + 1}`,
      },
      title: 'Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.DROP },
    });
  }
  editShip() {}
}
