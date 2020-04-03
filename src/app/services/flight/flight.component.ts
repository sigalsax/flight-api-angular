import { Component, OnInit} from '@angular/core';
import { FlightService } from './flight.service';
import { FlightModeledObject } from '../../models/flight.model';

import { Observable } from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  providers: [ FlightService ],
  styleUrls: ['./flight.component.css']
})

export class FlightComponent {
  flightObjects: FlightModeledObject[] = [];
  flightForm: FormGroup;
  submitted = false;

  constructor(private flightService: FlightService, private formBuilder: FormBuilder) {
  }

  ngOnInit(){
    this.flightForm = this.formBuilder.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      departureDate: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.flightForm.invalid) {
        return;
    }
    return this.getFlights()
  }

  getFlights(): Observable<FlightModeledObject> {
    return this.flightService.getData(this.flightForm.value.origin, this.flightForm.value.destination, this.flightForm.value.departureDate)
    .subscribe(
      (flightObjects => this.flightObjects = flightObjects));
  }
}
