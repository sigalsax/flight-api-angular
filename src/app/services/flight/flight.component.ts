import { Component } from '@angular/core';
import { FlightService } from './flight.service';
import { Flight } from '../../models/flight.model';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  providers: [ FlightService ],
  styles: ['']
})

export class FlightComponent {
  // TODO make object an array and update ngIf -> ngFor
  // object to to be rendered
  flightObject: any = {
    "price": "",
    "isDirect": "",
    "carrier": ""
  }

  //  flightService singleton
  constructor(private flightService: FlightService) {}

  filterFlight(res): void {
    let quote = res.Quotes[0];
    console.log(quote);
    this.convertIdToFlightCompany(res)
  }

  // The REST response returns Quotes with only CarrierIds and so this function
  // converts the CarrierIds to human readable flight companies
  convertIdToFlightCompany(res): void {
    let quotes = res.Quotes;
    let carriers = res.Carriers
    console.log(quote)
    console.log(carriers)
    for (var quote in quotes) {
      this.setFlightPrice(quotes[quote])
      this.setDirect(quotes[quote])
      // JSON.stringify(
      for (var quoteCarrierIds in quotes[quote].OutboundLeg.CarrierIds) {
        // 851 from Quotes
        console.log(quotes[quote].OutboundLeg.CarrierIds[quoteCarrierIds])
        for (var carrier in carriers) {
          console.log("Carrier " + carriers[carrier].CarrierId)
          if (quotes[quote].OutboundLeg.CarrierIds[quoteCarrierIds] == carriers[carrier].CarrierId) {
            this.flightObject.carrier = quotes[quote].OutboundLeg.CarrierIds[quoteCarrierIds]
          }
        }
      }
    }
    console.log(this.flightObject)
  }
  
  setFlightPrice(quotes) : void {
    this.flightObject.price = quotes.MinPrice
  }

  setDirect(quotes) : void {
    var direct = "Not Direct"
    if (quotes.Direct == true) {
      direct = "Direct"
    }
    this.flightObject.isDirect = direct
  }

  getQuotes(): void {
    this.flightService.getData()
    .subscribe(res => {
      console.log(res)
      this.filterFlight(res)
    })
  }
}
