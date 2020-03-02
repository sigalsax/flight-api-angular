import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Flight } from '../../models/flight.model';

// Service
@Injectable()
export class FlightService {
  data="https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2020-09-01"
  // public localUrl = '../../assets/quotes.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<Flight>  {
    const httpOptions = {
      headers: new HttpHeaders({
        "x-rapidapi-host": "",
      	"x-rapidapi-key": ""
      })
    };
    return this.http.get<Flight>(this.data, httpOptions);
  }

}
