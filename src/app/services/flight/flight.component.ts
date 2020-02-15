import { Component } from '@angular/core';
import { FlightService } from './flight.service';
import { Quotes } from '../../models/flight.model';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  providers: [ FlightService ],
  styles: ['']
})

export class FlightComponent {

  price: number;
  isDirect: boolean;
  idToCarr: string;

  quotes: Quotes = [];
  finishedQuotes = new Map();
  // ngOnInit() {
  //   quotes: Quotes = [];
  // }

  //  flightService singleton
  constructor(private flightService: FlightService) {
    this.price = 0;
    this.isDirect = false;
    this.idToCarr = "";
  }

  filterQuote(): void {
    let queryMap = new Map();
    this.isDirect = this.quotes[0]["Quotes"][0]["Direct"]

    for (var quote in this.quotes) {
    	this.price = this.quotes[0]["Quotes"][0]["MinPrice"]
    }
    // GOAL: change number of id to name of flight company
    for (var id in this.quotes[0]["Quotes"][0]["OutboundLeg"]["CarrierIds"]) {
      console.log("Carrier Id of quote = " + this.quotes[0]["Quotes"][0]["OutboundLeg"]["CarrierIds"][id])
      // traverse all known carriers
      for (var key in this.quotes[0]["Carriers"]) {
        console.log("Carrier key = " + this.quotes[0]["Carriers"][key]["CarrierId"])
        // check if the carrierIds match the carriers provided and if so change their
        if (this.quotes[0]["Quotes"][0]["OutboundLeg"]["CarrierIds"][id] == this.quotes[0]["Carriers"][key]["CarrierId"]) {
          this.quotes[0]["Quotes"][0]["OutboundLeg"]["CarrierIds"][id] = this.quotes[0]["Carriers"][key]["Name"]
          this.idToCarr = this.quotes[0]["Quotes"][0]["OutboundLeg"]["CarrierIds"][id];
        }
      }
    }

    // Price, 167 : jetblue
    queryMap.set(this.price, this.idToCarr)
    for (var [key, value] of queryMap) {
      console.log(key + ' : ' + value);
    }

    this.finishedQuotes.set("Airline", this.idToCarr)
    this.finishedQuotes.set("Direct", this.isDirect)
    this.finishedQuotes.set("Price", this.price)

    console.log(this.finishedQuotes)
  }


  getQuotes(): void {
    this.flightService.getData()
    .subscribe(res => {
      this.quotes.push(res);
    })

    console.log(this.quotes)
    this.filterQuote()
  }










  // dataManipulation() {

    // let queryMap = new Map();
    // this.price = this.flight["Quotes"][0]["MinPrice"]
    // console.log(this.price)
    // this.isDirect = this.flight["Quotes"][0]["Direct"]

    // for (var quote in this.flight["Quotes"]) {
    // 	var price = this.flight["Quotes"][quote]["MinPrice"]
    // 	console.log("Price to travel to MIA -> CUN " + price);
    // }


    // GOAL: change number of id to name of flight company
    // for (var id in this.flight["Quotes"][0]["OutboundLeg"]["CarrierIds"]) {
    //   console.log("Carrier Id of flight = " + this.flight["Quotes"][0]["OutboundLeg"]["CarrierIds"][id])
    //   // traverse all known carriers
    //   for (var key in this.flight["Carriers"]) {
    //     console.log("Carrier key = " + this.flight["Carriers"][key]["CarrierId"])
    //     // check if the carrierIds match the carriers provided and if so change their
    //     if (this.flight["Quotes"][0]["OutboundLeg"]["CarrierIds"][id] == this.flight["Carriers"][key]["CarrierId"]) {
    //       this.flight["Quotes"][0]["OutboundLeg"]["CarrierIds"][id] = this.flight["Carriers"][key]["Name"]
    //       this.idToCarr = this.flight["Quotes"][0]["OutboundLeg"]["CarrierIds"][id];
    //     }
    //   }
    // }

    // Price, 149 : jetblue
    // queryMap.set(price, this.idToCarr)
    // for (var [key, value] of queryMap) {
    //   console.log(key + ' : ' + value);
    // }
  // }


  // showData() {
  //   this.flightService.getData().pipe(
  //     map(res => _.values(res)),
  //     tap(res => console.log(`RES + ${res}`)))
  //     .subscribe(res => console.log(JSON.stringify(res)))
  //
  //   this.dataManipulation();
  // }
}
