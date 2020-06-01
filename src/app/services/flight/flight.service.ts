import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Flight, FlightModeledObject } from '../../models/flight.model';
import { map, tap, catchError} from "rxjs/operators";
import { of, Observable, Subscriber, Subject } from 'rxjs';

import * as moment from 'moment';
import {  connection } from "../../../rapidAPIConnection";

@Injectable()
export class FlightService {
  private flightObjects: any[]= [];
  private isError: boolean = false;
  
  private origin: String = ""
  private departure: String = ""
  private destination: String = ""
  private returnDate: String = ""

  private formatedDate: String = ""
  private formatedReturnDate: String = ""

  private flightsDataSubject: Subject<FlightModeledObject[]> = new Subject();

  constructor(private http: HttpClient) {}

  getFlightsDataObservable(): Observable<FlightModeledObject[]> {
    return this.flightsDataSubject.asObservable();
  }

  filterFlight(res): any[] {
    if (this.isError == true || res.Quotes == ""){
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

  buildURL(origin, destination, departure): string {
      return `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${origin}/${destination}/${departure}`
  }

  buildBuyURL(departure, returnDate): string {
      return `https://www.skyscanner.co.il/transport/flights/${this.origin}/${this.destination}/${moment(departure).format('YYMMDD')}/?adults=1&children=0&adultsv2=1&childrenv2=&infants=0&cabinclass=economy&rtn=1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&ref=home`
  }

  reverseItemOrder(flightObjects): any[] {
    var queuedFlights: any[] = new Array(flightObjects.length)
    for (var i = 0; i < flightObjects.length; i++) {
      queuedFlights[i] = flightObjects[flightObjects.length-1-i]
    }
    return queuedFlights
  }

  // The REST response returns Quotes with only CarrierIds and so this function
  // converts the CarrierIds to human readable flight companies
  convertIdToFlightCompany(res): any[] {
    let quotes = res.Quotes;
    let carriers = res.Carriers

    let carrierMap = new Map();
    
    // TODO extract to separate method
    carriers.forEach(c => {
      carrierMap.set(c.CarrierId, c);
    })

    quotes.forEach(quote => {
      console.log("Quotes " , quote)
      quote.OutboundLeg.CarrierIds.forEach(carrierId => {
        
        this.flightObjects.push({
          price: "$" + this.setFlightPrice(quote),
          isDirect: this.setDirect(quotes),
          carrier: carrierMap.get(carrierId).Name,
          date: this.getDate(quote.OutboundLeg.DepartureDate),
          buyURL: this.buildBuyURL(this.departure, this.returnDate)
        })
      })
    })
    return this.flightObjects
  }

  setFlightPrice(quotes): string {
    return quotes.MinPrice
  }

  setDirect(quotes): string {
    var direct = "Not Direct"
    if (quotes.Direct === true) {
      direct = "Direct"
    }
    return direct
  }

  getDate(departure): string {
    return moment(departure).format('dddd, MMMM Do YYYY')
  }
  
  getData(origin, destination, departure, returnDate): void{
    console.log(origin, destination, departure, returnDate)
    this.origin = origin
    this.destination = destination
    this.departure = departure;
    this.returnDate = moment(returnDate).format("YYYY-MM-DD");
    
    this.formatedDate = this.getDate(departure);
   
    const httpOptions = {
      headers: new HttpHeaders({
        "x-rapidapi-host": connection["host"],
        "x-rapidapi-key": connection["key"],
        "useQueryString": "true"
      }),
      params: new HttpParams().set('inboundpartialdate', moment(returnDate).format("YYYY-MM-DD"))
    };
    
    this.http.get<Flight>(this.buildURL(origin, destination, moment(departure).format("YYYY-MM-DD")), httpOptions)
    .pipe(
      // replacement Observable on error
      catchError(err => {
        this.isError = true;
        return of([]);
      }),
      tap(res => console.log("Result: " + JSON.stringify(res))),
      map((res: Flight) => this.filterFlight(res))
    ).subscribe(flightsList => this.flightsDataSubject.next(flightsList))
  }
}
