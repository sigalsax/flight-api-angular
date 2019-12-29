import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  providers: [ ApiService ],
  styles: ['']
})

// Controller
export class ApiComponent {
  api=true
  flightDetails: Flight;
  //  apiService singleton
  constructor(private apiService: ApiService) {}

  // showApiData() {
  //   console.log("hello");
  //   this.apiService.getDBdata()
  //     .subscribe((data: Api) => this.api = {
  //       sigal: data['sigal'],
  //     });
  //   }
  showApiData() {
    console.log("hello");
    // data manipulation in service
    this.apiService.getDBdata()
      .subscribe(
        (data: Flight) => this.flightDetails = {
        ...data
        }

        // data => this.flightDetails = {
        //   quoteId:  (data as any).quoteId,
        //   minPrice:  (data as any).minPrice,
        //   direct:  (data as any).direct,
        //   updated:  (data as any).updated
        // }
        // data => {
        //   console.log(data)
        // }
        // (data: Flight) => this.flightDetails = {
        // ...data
        // }
      );
      // .subscribe(data => {
      //   this.results = data;
      //   console.log(data);
      // })
    }
  }
