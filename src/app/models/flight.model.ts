export interface Flight {
  quoteId: number,
  minPrice: number,
  direct: boolean,
  updated: string
}

// export class FlightModel implements Flight {
//   quoteId: number;
//   minPrice: number;
//   direct: boolean;
//   updated: string;
//
//   constructor (flightModelSingleton: FlightModel) {
//     this.quoteId = flightModelSingleton.quoteId;
//     this.minPrice = flightModelSingleton.minPrice;
//     this.direct = flightModelSingleton.direct;
//     this.updated = flightModelSingleton.updated;
//   }
// }
