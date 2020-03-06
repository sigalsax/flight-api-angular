import { Component } from '@angular/core';
import { FlightService } from './flight.service';
import { Flight, FlightModeledObject } from '../../models/flight.model';
import { tap, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  providers: [ FlightService ],
  styles: ['']
})

export class FlightComponent {
  origin: string;
  destination: string;
  departureDate: string;

  flightObject: FlightModeledObject

  // flightService singleton
  constructor(private flightService: FlightService) {}

  getFlights(origin, departureDate) {
    this.flightService.getData(this.origin, this.destination, this.departureDate).subscribe(
      ((resFlight: FlightModeledObject) => this.flightObject = resFlight)
    );
  }
}
