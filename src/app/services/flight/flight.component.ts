import { Component } from '@angular/core';
import { FlightService } from './flight.service';
import { FlightModeledObject } from '../../models/flight.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  providers: [ FlightService ],
  styles: ['']
})

export class FlightComponent {
  flightObjects: FlightModeledObject

  flightForm = new FormGroup({
    origin: new FormControl('MIA'),
    destination: new FormControl('JFK'),
    departureDate: new FormControl('2020-04-01'),
  });

  constructor(private flightService: FlightService) {
  }

  getFlights(): Observable<FlightModeledObject> {
    return this.flightService.getData(this.flightForm.value.origin, this.flightForm.value.destination, this.flightForm.value.departureDate)
    .subscribe(
      ((resFlight: FlightModeledObject) => this.flightObjects = resFlight)
    );
  }
}
