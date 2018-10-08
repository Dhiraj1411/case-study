import { Component } from '@angular/core';
import { ProgressBarService } from './shared/service/progress-bar/progress-bar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private pb: ProgressBarService) { }
}
