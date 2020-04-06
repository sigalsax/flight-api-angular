import { ActionTypes } from './flight.actions';

import { FlightModeledObject } from '../models/flight.model';

export interface InitialState {
    flightItems: Array<FlightModeledObject>
}

export const initialState = {
    flightItems: []
}

export function FlightReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.Add:
            return  {
                ...state,
                flightItems: [...action.payload]
            }
        default:
            return state;
    }
}
