import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  constructor(private http: HttpClient) { }

  _getBarsData() {
    return this.http.get('http://pb-api.herokuapp.com/bars');
  }
}
