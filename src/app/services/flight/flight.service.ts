import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Quotes } from '../../models/flight.model';

// Service
@Injectable()
export class FlightService {
  data="https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2020-01-20"

  constructor(private http: HttpClient) {}
  // Observable
  getData() {
    const httpOptions = {
      headers: new HttpHeaders({
        "x-rapidapi-host": "",
      	"x-rapidapi-key": ""
      })
    };
    return this.http.get<Quotes>(this.data, httpOptions);
  }



}
