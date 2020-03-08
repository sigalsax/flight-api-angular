import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Flight, FlightModeledObject } from '../../models/flight.model';
import { map, tap} from "rxjs/operators";

@Injectable()
export class FlightService {
  emptyObservable: boolean
  flightObjects: {price: string, isDirect: string, carrier: string }[] = [
    { 
      "price": "",
      "isDirect": "",
      "carrier": ""
    }
  ]

  constructor(private http: HttpClient) {
    this.emptyObservable = false
  }

  filterFlight(res) {
    let quote = res.Quotes;
    console.log(quote)

    if (quote.length !== 0) {
      this.convertIdToFlightCompany(res)
    } else {
      this.emptyObservable = true
    }
    return this.flightObjects
  }

  configureURL(origin, destination, departure) {
    return `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${origin}/${destination}/${departure}`
  }

  // The REST response returns Quotes with only CarrierIds and so this function
  // converts the CarrierIds to human readable flight companies
  convertIdToFlightCompany(res): void {
    let quotes = res.Quotes;
    let carriers = res.Carriers

    for (var quote in quotes) {
      for (var quoteCarrierIds in quotes[quote].OutboundLeg.CarrierIds) {
        for (var carrier in carriers) {
          if (quotes[quote].OutboundLeg.CarrierIds[quoteCarrierIds] == carriers[carrier].CarrierId) {
            this.flightObjects.push({
              price: this.setFlightPrice(quotes[quote]),
              isDirect: this.setDirect(quotes[quote]),
              carrier: carriers[carrier].Name
            })
          }
        }
      }
    }
  }

  setFlightPrice(quotes) {
    return quotes.MinPrice
  }

  setDirect(quotes) {
    var direct = "Not Direct"
    if (quotes.Direct == true) {
      direct = "Direct"
    }
    return direct
  }

  getData(origin, destination, departure) {
    const httpOptions = {
      headers: new HttpHeaders({
        "x-rapidapi-host": "",
        "x-rapidapi-key": ""
      })
    };
    console.log(this.configureURL(origin, destination, departure))
    return this.http.get<Flight>(this.configureURL(origin, destination, departure), httpOptions)
      .pipe(
        tap(res => console.log(res)),
        map((res: Flight) => this.filterFlight(res)) 
      )
  }
}
