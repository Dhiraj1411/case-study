export interface IAppState {
    cities: City;
    vehicles: Vehicle;
}

export interface City {
    name: string;
    distance: number;
}

export interface Vehicle {
    name: string;
    total_no: number;
    max_distance: number;
    speed: number;
}
