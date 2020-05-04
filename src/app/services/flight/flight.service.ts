import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Flight } from '../../models/flight.model';
import { map, tap, catchError} from "rxjs/operators";
import { of } from 'rxjs';

import * as moment from 'moment';
import {  connection } from "../../../rapidAPIConnection";

@Injectable()
export class FlightService {
  flightObjects: any[]= [];
  isError: boolean = false;
  
  origin: String = ""
  departure: String = ""
  destination: String = ""

  formatedDate: String = ""
  
  constructor(private http: HttpClient) {}

  filterFlight(res) {
    if (this.isError == true){
      this.flightObjects.push({
          price: "--",
          isDirect: "--",
          carrier: "--",
          date: this.formatedDate,
          buyURL: "--"
      })
      this.isError = false;
    } else {
        let quote = res.Quotes;
        this.convertIdToFlightCompany(res)
    }
    // used to render the data sorted from newest to oldest
    return this.reverseItemOrder(this.flightObjects)
  }

  buildURL(origin, destination, departure) {
    return `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${origin}/${destination}/${departure}`
  }

  buildBuyURL(departure) {
    return `https://www.skyscanner.co.il/transport/flights/${this.origin}/${this.destination}/${moment(departure).format('YYMMDD')}/?adults=1&children=0&adultsv2=1&childrenv2=&infants=0&cabinclass=economy&rtn=1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&ref=home`
  }

  reverseItemOrder(flightObjects) {
    var queuedFlights:any[] = new Array(flightObjects.length)
    for (var i = 0; i < flightObjects.length; i++) {
      queuedFlights[i] = flightObjects[flightObjects.length-1-i]
    }
    return queuedFlights
  }
  // The REST response returns Quotes with only CarrierIds and so this function
  // converts the CarrierIds to human readable flight companies
  convertIdToFlightCompany(res) {
    let quotes = res.Quotes;
    let carriers = res.Carriers
      for (var quote in quotes) {
        for (var quoteCarrierIds in quotes[quote].OutboundLeg.CarrierIds) {
          for (var carrier in carriers) {
            if (quotes[quote].OutboundLeg.CarrierIds[quoteCarrierIds] == carriers[carrier].CarrierId) {
              this.flightObjects.push({
                price: "$" + this.setFlightPrice(quotes[quote]),
                isDirect: this.setDirect(quotes[quote]),
                carrier: carriers[carrier].Name,
                date: this.getDate(quotes[quote].OutboundLeg.DepartureDate),
                buyURL: this.buildBuyURL(this.departure)
              })
            }
          }
        }
      }
    return this.flightObjects
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

  getDate(departure) {
    return moment(departure).format('dddd, MMMM Do YYYY')
  }

  getData(origin, destination, departure) {
    this.origin = origin
    this.destination = destination
    this.departure = departure;
    
    // console.log(this.buildBuyURL(this.departure))
    this.formatedDate = this.getDate(departure);
    const httpOptions = {
      headers: new HttpHeaders({
        "x-rapidapi-host": connection["host"],
        "x-rapidapi-key": connection["key"]
      })
    };
    
    return this.http.get<Flight>(this.buildURL(origin, destination, moment(departure).format("YYYY-MM-DD")), httpOptions)
    .pipe(
      // replacement Observable on error
      catchError(err => {
        this.isError = true;
        return of([]);
      }),
      tap(res => console.log(res)),
      map((res: Flight) => this.filterFlight(res)),
      tap(res => console.log(res))
    )
  }
}
