import { Component } from '@angular/core';
import { FlightService } from './flight.service';
import { Quotes } from '../../models/flight.model';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  providers: [ FlightService ],
  styles: ['']
})

// Controller
export class FlightComponent {
	flight: Quotes;
  price: number;
  isDirect: boolean;
  idToCarr: string;

  //  apiService singleton
  constructor(private flightService: FlightService) {
    this.price = 0;
    this.isDirect = false;
    this.idToCarr = "";
  }

  dataManipulation() {
    let queryMap = new Map();
    this.price = this.flight["Quotes"][0]["MinPrice"]
    this.isDirect = this.flight["Quotes"][0]["Direct"]
    for (var quote in this.flight["Quotes"]) {
    	var price = this.flight["Quotes"][quote]["MinPrice"]
    	console.log("Price to travel to MIA -> CUN " + price);
    }

    // GOAL: change number of id to name of flight company
    for (var id in this.flight["Quotes"][0]["OutboundLeg"]["CarrierIds"]) {
      console.log("Carrier Id of flight = " + this.flight["Quotes"][0]["OutboundLeg"]["CarrierIds"][id])
      // traverse all known carriers
      for (var key in this.flight["Carriers"]) {
        console.log("Carrier key = " + this.flight["Carriers"][key]["CarrierId"])
        // check if the carrierIds match the carriers provided and if so change their
        if (this.flight["Quotes"][0]["OutboundLeg"]["CarrierIds"][id] == this.flight["Carriers"][key]["CarrierId"]) {
          this.flight["Quotes"][0]["OutboundLeg"]["CarrierIds"][id] = this.flight["Carriers"][key]["Name"]
          this.idToCarr = this.flight["Quotes"][0]["OutboundLeg"]["CarrierIds"][id];
        }
      }
    }

    // Price, 149 : jetblue
    queryMap.set(price, this.idToCarr)
    for (var [key, value] of queryMap) {
      console.log(key + ' : ' + value);
    }
  }

  showData() {
    this.flightService.getData().subscribe(res => {
      this.flight = res;
      console.log(this.flight);
    });
    this.dataManipulation();
  }
}
