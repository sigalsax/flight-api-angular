import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { FlightService } from '../services/flight/flight.service';
import { FlightModeledObject } from '../models/flight.model';

import { Subscription, Observable } from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  providers: [ FlightService ],
  styleUrls: ['./flight.component.css']
})

export class FlightComponent {
  public flightObjects$: Observable<FlightModeledObject[]>;

  public flightForm: FormGroup;
  
  checked: boolean = false;
  tempLocationOrigin: string = ""
  tempLocationDestination: string = ""
  columnsToDisplay = ['date', 'carrier', 'price', 'direct', 'url']

  constructor(
    private flightService: FlightService, 
    private formBuilder: FormBuilder,
    ){}

  ngOnInit(){
    this.flightForm = this.formBuilder.group({
      origin: ['MIA', Validators.required],
      destination: ['TLV', Validators.required],
      departureDate: [moment().format("YYYY-MM-DD"), Validators.required],
      roundTrip: [''],
      returnDate: ['']
    });
    this.flightObjects$ = this.flightService.getFlightsDataObservable()
  }

  checkedButton(event) {
    this.checked=!this.checked
  }

  swapFlight(){
    this.tempLocationOrigin=this.flightForm.value.origin
    this.tempLocationDestination=this.flightForm.value.destination
    
    this.flightForm.patchValue({origin: this.tempLocationDestination, destination: this.tempLocationOrigin})
  }

  onSubmit(): void {
    console.log(this.flightForm.value.roundTrip)
    this.flightService.getData(this.flightForm.value.origin, this.flightForm.value.destination, this.flightForm.value.departureDate, this.flightForm.value.returnDate)
  }
}
