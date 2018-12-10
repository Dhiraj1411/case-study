import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle, City } from './find-job.model';
import { AbstractControl } from '@angular/forms';

import { Store } from '@ngrx/store';

@Pipe({
    name: 'filterCities'
})
export class FilterCitiesPipe implements PipeTransform {
    transform(data: Array<City[]>, ...args: any[]) {
        const result = [];
        if (data) {
            data.forEach((obj) => {
                let flag = true;
                args[0].forEach((elem) => {
                    if (obj['name'] === elem['name']) {
                        flag = false;
                    }
                });
                if (flag) {
                    result.push(obj);
                }
            });
        }
        return result;
    }
}

@Pipe({
    name: 'enableDisableVehiclePipe'
})
export class EnableDisableVehiclePipe implements PipeTransform {

    constructor(private store: Store<any>) {

    }

    transform(vehicles: Array<Vehicle[]>, ...args: any[]) {

        const result = [];
        const cntrlArray = [];
        const selectedVehicle = args[0];
        const selectedDestination = args[1];
        const formCntrl: AbstractControl = args[2];

        if (formCntrl) {
            const firstDestination = formCntrl.get('firstSelectedDesination').value;
            const firstVehicle = formCntrl.get('firstDestinationVehicle').value;
            const secondDestination = formCntrl.get('secondSelectedDesination').value;
            const secondVehicle = formCntrl.get('secondDestinationVehicle').value;

            if (selectedDestination['name'] !== firstDestination.name) {
                cntrlArray.push({
                    destination: firstDestination,
                    vehicle: firstVehicle
                });
            }
            if (selectedDestination['name'] !== secondDestination.name) {
                cntrlArray.push({
                    destination: secondDestination,
                    vehicle: secondVehicle
                });
            }
        }
        if (vehicles) {
            vehicles.forEach((vehicle) => {
                cntrlArray.forEach((elem) => {
                    if (vehicle['name'] === elem['vehicle']['name']) {

                        const count = this.vehicleRemainingCount(elem['destination']['distance'],
                            vehicle['total_no'], vehicle['max_distance']);

                        vehicle['disabled'] = false;
                        vehicle['total_no'] = count;
                    }
                });

                result.push(vehicle);
            });
        }
        return result;
    }

    vehicleRemainingCount(distance_to_cover, vehicleCout, vechile_max_distance) {
        if (distance_to_cover <= vechile_max_distance) {
            return vehicleCout - 1;
        } else {
            return vehicleCout - Math.ceil(vehicleCout * vechile_max_distance / distance_to_cover);
        }
    }
}
