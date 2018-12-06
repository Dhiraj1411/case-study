import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Cities } from '../models/cities';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { ActionTypes } from '../find-job.action';
import { tap, map, mapTo, exhaustMap, catchError } from 'rxjs/operators';
import { City } from '../find-job.model';

@Injectable({
  providedIn: 'root'
})
export class FindJobService {

  constructor(
    private http: HttpClient,
    private actions$: Actions
  ) { }

  getToken = (): Observable<any> => {
    return this.http.post('https://craft-demo-intuit.herokuapp.com/token', '');
  }

  getCities = (): Observable<any> => {
    return this.http.get('https://craft-demo-intuit.herokuapp.com/cities');
  }

  getvehicles = (): Observable<any> => {
    return this.http.get('https://craft-demo-intuit.herokuapp.com/vehicles');
  }

  findJob = (param): Observable<any> => {
    return this.http.post('https://craft-demo-intuit.herokuapp.com/find', param);
  }

}
