import { Action } from '@ngrx/store'

export enum ActionTypes {
    Add = '[Product] Add to flight',
}

export const AddFlightItem = payload => ({
    type: ActionTypes.Add,
    payload
  })

