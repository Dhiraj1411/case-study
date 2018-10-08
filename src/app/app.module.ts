import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './shared/service/interceptor/interceptor.service';

// custom module
import { AppRoutingModule } from './shared/app-routing/app-routing.module';
import { SharedModuleModule } from './shared/shared-module/shared-module.module';

// Component
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { FindJobComponent } from './find-job/find-job.component';
import { DynamicProgressBarComponent } from './dynamic-progress-bar/dynamic-progress-bar.component';
import { NavigationBarComponent } from './shared/components/navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MovieSearchComponent,
    FindJobComponent,
    DynamicProgressBarComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModuleModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
