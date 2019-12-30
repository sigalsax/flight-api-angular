import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Flight } from '../../models/flight.model';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  data="https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2020-01-20"

  getData() {
    const httpOptions = {
      headers: new HttpHeaders({
        "x-rapidapi-host": "",
      	"x-rapidapi-key": ""
      })
    };
    return this.http.get<Flight>(this.data, httpOptions);
  }
}
