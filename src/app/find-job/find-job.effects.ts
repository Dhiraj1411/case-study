import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { FindJobService } from './service/find-job.service';
import { ActionTypes, GetCities, GetCitiesSuccess, GetVehicle, GetVehicleSuccess } from './find-job.action';
import { Observable, of } from 'rxjs';
import { tap, map, mapTo, exhaustMap, catchError } from 'rxjs/operators';
import { City } from './find-job.model';

@Injectable()
export class FindJobEffect {

    @Effect()
    getCities$ = this.actions$.pipe(
        ofType(ActionTypes.getCities),
        map((action: GetCities) => action),
        exhaustMap(() =>
            this.findJobService
                .getCities()
                .pipe(
                map(city => new GetCitiesSuccess(city))
                )
        )
    );

    @Effect()
    getVehicle$ = this.actions$.pipe(
        ofType(ActionTypes.getVehicle),
        map((action: GetVehicle) => action),
        exhaustMap(() => this.findJobService.getvehicles().pipe(map(vehicle => new GetVehicleSuccess(vehicle))))
    );

    constructor(
        private actions$: Actions,
        private findJobService: FindJobService
    ) { }

}
