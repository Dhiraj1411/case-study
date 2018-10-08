import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  private _isLoading: Boolean = false;
  constructor() { }

  set isLoading(data) {
    this._isLoading = data;
  }

  get isLoading() {
    return this._isLoading;
  }
}
