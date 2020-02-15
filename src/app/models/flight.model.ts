// export default class Quotes {
//   quoteId: number;
//   minPrice: number;
//   direct: boolean;
//   // outboundLeg: OutboundLeg[];
//
//
// constructor(quoteId: number, minPrice: number, direct: boolean){
//     this.quoteId = quoteId;
//     this.minPrice = minPrice;
//     this.direct = direct;
//   }
// }
export interface Quotes {
  QuoteId: number;
  MinPrice: number;
  Direct: boolean;
  OutboundLeg: OutboundLeg[];
}

export interface OutboundLeg {
  carrierIds: CarrierIds[];
  originId: number;
  departureDate: string;
}

export interface CarrierIds {
  carrierIds: number;
}
