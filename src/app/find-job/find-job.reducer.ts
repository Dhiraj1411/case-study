import { Action, State } from '@ngrx/store';
import { ActionTypes } from './find-job.action';
import { IAppState, City } from './find-job.model';

import { Actions } from '@ngrx/effects';
import { FindJobActions } from './find-job.action';
import { FindJobService } from './service/find-job.service';

export function findJobReducer(state = {}, action: FindJobActions) {
    switch (action.type) {
        case ActionTypes.getCities: {
            return state;
        }
        case ActionTypes.getCitiesSuccess: {
            // return [...state, action.payload];

            return Object.assign(state, { cities: action.payload });
        }
        case ActionTypes.getVehicle: {
            return state;
        }
        case ActionTypes.getVehicleSuccess: {
            // return [...state, action.payload];
            return Object.assign(state, { vehicles: action.payload });
        }
        default: {
            return state;
        }
    }
}

