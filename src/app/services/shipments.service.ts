import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class ShipmentsService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
  }

  loadShipments(page: number = 1) {
    const url = `${base_url}admin/shipments/?page=${page}&page_size=10`;
    return this.http.get(url, this.headers).pipe(
      tap( (resp: any ) => {
        return resp.results;
      })
    );
  }
  loadShipment(id: number) {
    const url = `${base_url}admin/shipments/?id=${id}`;
    return this.http.get(url, this.headers);
  }
  create(shipment: any) {
    const url = `${base_url}admin/shipments/`;
    return this.http.post(url,shipment, this.headers)
  }

  getLocation(customer: string) {
    const url = `${base_url}admin/customer_points/?customer=${customer}`;
    return this.http.get(url, this.headers);
  }

  getCustomers() {
    const url = `${base_url}admin/customers/?page=1&page_size=15`;
    return this.http.get(url, this.headers);
  }
  getRoutes() {
    const url = `${base_url}admin/customer_rate_routes/?page=1&page_size=15`;
    return this.http.get(url, this.headers);
  }
  getVehicleOperators() {
    const url = `${base_url}admin/vehicle_operators/?page=1&page_size=15`;
    return this.http.get(url, this.headers);
  }
  getTypeVehicle() {
    const url = `${base_url}admin/catalogs/vehicle_types/`;
    return this.http.get(url, this.headers);
  }
}
