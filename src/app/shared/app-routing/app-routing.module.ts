import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { MovieSearchComponent } from '../../movie-search/movie-search.component';
import { FindJobComponent } from '../../find-job/find-job.component';
import { DynamicProgressBarComponent } from '../../dynamic-progress-bar/dynamic-progress-bar.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'find-job',
    component: FindJobComponent
  },
  {
    path: 'movie-search',
    component: MovieSearchComponent
  },
  {
    path: 'dynamic-progress-bar',
    component: DynamicProgressBarComponent
  },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
