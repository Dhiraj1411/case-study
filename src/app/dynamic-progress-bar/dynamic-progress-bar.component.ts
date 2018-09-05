import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from './service/progress-bar.service';
@Component({
  selector: 'app-dynamic-progress-bar',
  templateUrl: './dynamic-progress-bar.component.html',
  styleUrls: ['./dynamic-progress-bar.component.scss']
})
export class DynamicProgressBarComponent {

  barData;
  errorMsg = '';
  limit;
  buttonGrp = [];
  type = [];
  barArray = [];
  barVal = '';

  constructor(
    private progDataServ: ProgressBarService
  ) {
    this.progDataServ._getBarsData().subscribe(
      (success: any) => {
        this.barData = success.bars;
        this.limit = success.limit;
        this.buttonGrp = success.buttons;
        for (let i = 0; i < this.barData.length; i++) {
          this.barArray[i] = this.barData[i];
          this.changeBarColor(i);
        }
      },
      (error) => this.errorMsg = error
    );
  }

  refreshVal(newVal, index) {
    this.barArray[index] = this.barArray[index] + newVal;
    if (this.barArray[index] < 0) {
      this.barArray[index] = 0;
    }
    this.changeBarColor(index);
  }

  changeBarColor(i) {
    if (this.barArray[i] < this.limit) {
      this.type[i] = 'info';
    } else if (this.barArray[i] === this.limit) {
      this.type[i] = 'accent';
    } else if (this.barArray[i] > this.limit) {
      this.type[i] = 'warn';
    }
  }

}
