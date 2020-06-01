export interface FlightModeledObject {
  price: string;
  isDirect: string;
  carrier: string;
  date: string;
}

export interface Flight {
  Quotes: Array<Quote>;
  Places: Array<Place>;
  Carriers: Array<Carrier>;
  QuoteDateTime: string;
}

export interface Quote {
  QuoteId: number;
  MinPrice: number;
  Direct: boolean;
  OutboundLeg: Array<OutboundLeg>;
  InboundLeg: Array<InboundLeg>;
}

export interface OutboundLeg {
  CarrierIds: Array<number>;
  OriginId: number;
  DestinationId: number;
  DepartureDate: string;
}

export interface InboundLeg {
  CarrierIds: Array<number>;
  OriginId: number;
  DestinationId: number;
  DepartureDate: string;
}

export interface Place {
  PlaceId: number;
  IataCode: string;
  Name: string;
  Type: string;
  SkyscannerCode: string;
  CityName: string;
  CityId: string;
  CountryName: string;
}

export interface Carrier {
  CarrierId: number;
  Name: string;
}
