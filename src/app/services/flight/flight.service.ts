import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Flight, FlightModeledObject } from '../../models/flight.model';

import { map, tap} from "rxjs/operators";
// Service
@Injectable()
export class FlightService {
  // data="https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2020-09-01"

  flightObject: any = {
    "price": "",
    "isDirect": "",
    "carrier": ""
  }

  constructor(private http: HttpClient) {}

  filterFlight(res): void {
    let quote = res.Quotes[0];
    this.convertIdToFlightCompany(res)
    return this.flightObject
  }

  configureURL(origin, destination, departure) {
    return `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${origin}/${destination}/${departure}`
  }

  // The REST response returns Quotes with only CarrierIds and so this function
  // converts the CarrierIds to human readable flight companies
  convertIdToFlightCompany(res): void {
    let quotes = res.Quotes;
    let carriers = res.Carriers
    // console.log(quote)
    // console.log(carriers)
    for (var quote in quotes) {
      this.setFlightPrice(quotes[quote])
      this.setDirect(quotes[quote])
      // JSON.stringify(
      for (var quoteCarrierIds in quotes[quote].OutboundLeg.CarrierIds) {
        // 851 from Quotes
        // console.log(quotes[quote].OutboundLeg.CarrierIds[quoteCarrierIds])
        for (var carrier in carriers) {
          console.log("Carrier " + carriers[carrier].CarrierId)
          if (quotes[quote].OutboundLeg.CarrierIds[quoteCarrierIds] == carriers[carrier].CarrierId) {
            this.flightObject.carrier = carriers[carrier].Name
          }
        }
      }
    }
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

  getData(origin, destination, departure) {
    const httpOptions = {
      headers: new HttpHeaders({
        "x-rapidapi-host": "",
        "x-rapidapi-key": ""
      })
    };
    return this.http.get<Flight>(this.configureURL(origin, destination, departure), httpOptions)
      .pipe(
        map((res: Flight) => this.filterFlight(res))
      )
  }
}
