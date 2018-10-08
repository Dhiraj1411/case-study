import { Component, DoCheck } from '@angular/core';
import { ProgressBarService } from './shared/service/progress-bar/progress-bar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  isLoading: Boolean = false;
  constructor(private pb: ProgressBarService) { }
  ngDoCheck() {
    this.isLoading = this.pb.isLoading;
  }
}
