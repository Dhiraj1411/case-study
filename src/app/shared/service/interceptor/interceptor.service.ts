import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ProgressBarService } from '../progress-bar/progress-bar.service';
@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private pb: ProgressBarService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.pb.isLoading = true;

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.pb.isLoading = false;
        }
      },
        (error: any) => {
          console.log(error);
          this.pb.isLoading = false;
        })
    );
  }

}
