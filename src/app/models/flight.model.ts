export interface Quotes {
  quoteId: number;
  minPrice: number;
  direct: boolean;
  outboundLeg: OutboundLeg[];
}

export interface OutboundLeg {
  carrierIds: CarrierIds[];
  originId: number;
  departureDate: string;
}

export interface CarrierIds {
  carrierIds: number;
}
