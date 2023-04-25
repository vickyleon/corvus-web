export interface Shipments {
    count:    number;
    next:     string;
    previous: null;
    results:  Result[];
}

export interface Result {
    id:                    number;
    origin:                string;
    destination:           string;
    load_type:             string;
    trip_type:             string;
    latitude:              null;
    longitude:             null;
    vehicle_type:          string;
    vehicle_code:          string;
    consignment_note:      number | null;
    gps_tracking:          string;
    monitoring:            Monitoring;
    cost:                  string;
    customer_invoice:      string;
    temperature:           string;
    send_to_operator:      boolean;
    cancellation_remarks:  null;
    updated_date:          string;
    load_date:             null;
    upload_date:           null;
    created:               string;
    status_log:            StatusLog;
    folio:                 number;
    customer:              number;
    customer_route:        number;
    vehicle_operator:      number;
    vehicle:               number;
    trailer_one:           number;
    dolly:                 number;
    trailer_two:           number;
    status:                string;
    cancellation_reason:   null;
    partner:               number;
    invoice_01:            string;
    invoice_02:            string;
    is_invoiced:           string;
    customer_name:         string;
    customer_route_name:   string;
    vehicle_operator_name: string;
    departure_date:        string;
    arrival_date:          string;
    departure_time:        string;
    arrival_time:          string;
    vehicle_name:          string;
    plate_vehicle:         string;
    trailer_one_name:      string;
    plate_trailer_one:     string;
    dolly_name:            string;
    trailer_two_name:      string;
    plate_trailer_two:     string;
    distribution:          boolean;
    tab:                   number;
    kilometers:            number;
}

export interface Monitoring {
    id:              number;
    category:        string;
    created:         string;
    description:     string;
    shipment:        number;
    user:            string;
    shipment_name:   string;
    shipment_status: StatusLog;
}

export interface StatusLog {
    pending: Date;
}