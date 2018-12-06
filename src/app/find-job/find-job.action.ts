import { Action } from '@ngrx/store';
import { City, Vehicle } from './find-job.model';

export enum ActionTypes {

    getCities = '[FindJob Component] getCities',
    getVehicle = '[FindJob Component] getVehicle',

    getCitiesSuccess = '[FindJob Component] getCities success',
    getVehicleSuccess = '[FindJob Component] getVehicle success',

    selectFirstDestination = '[FindJob Component] First Destination',
    selectSecondDestination = '[FindJob Component] Second Destination',
    selectThirdDestination = '[FindJob Component] Third Destination',
    selectFourthDestination = '[FindJob Component] Fourth Destination',

    chooseVehicle = '[FindJob Component] Choose Vehicle',

}

export class GetCities implements Action {
    readonly type = ActionTypes.getCities;
}

export class GetCitiesSuccess implements Action {
    readonly type = ActionTypes.getCitiesSuccess;
    constructor(public payload: City) { }
}

export class GetVehicle implements Action {
    readonly type = ActionTypes.getVehicle;
}

export class GetVehicleSuccess implements Action {
    readonly type = ActionTypes.getVehicleSuccess;
    constructor(public payload: Vehicle) { }
}

export class SelectFirstDestination implements Action {
    readonly type = ActionTypes.selectFirstDestination;
}

export class SelectSecondDestination implements Action {
    readonly type = ActionTypes.selectSecondDestination;
}

export class SelectThirdDestination implements Action {
    readonly type = ActionTypes.selectThirdDestination;
}

export class SelectFourthDestination implements Action {
    readonly type = ActionTypes.selectFourthDestination;
}
/*
export class SelectFirstVehicle implements Action {
    readonly type = ActionTypes.selectFirstVehicle;
}

export class SelectSecondVehicle implements Action {
    readonly type = ActionTypes.selectSecondVehicle;
}

export class SelectThirdVehicle implements Action {
    readonly type = ActionTypes.selectThirdVehicle;
}

export class SelectFourthVehicle implements Action {
    readonly type = ActionTypes.selectFourthVehicle;
}*/

export type FindJobActions = | GetCities | GetCitiesSuccess | GetVehicle | GetVehicleSuccess;
