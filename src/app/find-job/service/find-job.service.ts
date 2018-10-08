import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Cities } from '../models/cities';
@Injectable({
  providedIn: 'root'
})
export class FindJobService {

  constructor(private http: HttpClient) { }

  getToken = (): Observable<any> => {
    return this.http.post('https://craft-demo-intuit.herokuapp.com/token', '');
  }

  getCities = (): Observable<any> => {
    return this.http.get('https://craft-demo-intuit.herokuapp.com/cities');
  }

  getvehicles = (): Observable<any> => {
    return this.http.get('https://craft-demo-intuit.herokuapp.com/vehicles');
  }

  findJob = (param):Observable<any> => {
    return this.http.post('https://craft-demo-intuit.herokuapp.com/find', param);
  }

}
