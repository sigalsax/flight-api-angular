import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from '../../models/flight.model';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }
  data='assets/database.json';

  getDBdata() {
    console.log("im here");
    return this.http.get<Flight>(
      this.data);
  }
}
