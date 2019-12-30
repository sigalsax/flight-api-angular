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
	flight: Flight;
  //  apiService singleton
  constructor(private apiService: ApiService) {}

  showData() {
    this.apiService.getData()
      .subscribe(
        res => {
          console.log(res)
          this.flight = res;
          console.log(this.flight.Quotes)
        }
        // data => this.flight = {
        //   quoteId:  (data as any).quoteId,
        //   minPrice:  (data as any).minPrice,
        //   direct:  (data as any).direct,
        //   updated:  (data as any).updated
        // }
      );
    }
  }
