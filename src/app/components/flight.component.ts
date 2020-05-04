import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { FlightService } from '../services/flight/flight.service';
import { FlightModeledObject } from '../models/flight.model';

import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { InitialState } from './flight.reducer';
import { AddFlightItem } from './flight.actions';

import { MatTable } from '@angular/material';

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
  emptyQuery = false;

  @ViewChild(MatTable,{static:true}) table
  
  columnsToDisplay = ['date', 'carrier', 'price', 'direct', 'url']

  constructor(
    private ngRedux: NgRedux<InitialState>,
    private flightService: FlightService, 
    private formBuilder: FormBuilder,
    ){}

  ngOnInit(){
    this.flightForm = this.formBuilder.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      departureDate: ['', Validators.required],
    });
  }

  onSubmit() { 
    return this.getFlights()
  }

  refreshTable() {
    table: MatTable;
    this.table.renderRows();
  }

  getFlights() {
    return this.flightService.getData(this.flightForm.value.origin, this.flightForm.value.destination, this.flightForm.value.departureDate)
    .subscribe(
      flightObjects => {
        this.emptyQuery = false
        this.refreshTable()
        this.flightObjects = flightObjects
        this.ngRedux.dispatch(AddFlightItem(this.flightObjects))
        this.submitted=true;
        console.log("State: " + (JSON.stringify(this.ngRedux.getState())))
      },
      error => {
        this.emptyQuery = true
      }
    );
  }

  ngOnDestroy(){
    this.getFlights().unsubscribe();
  }
}
