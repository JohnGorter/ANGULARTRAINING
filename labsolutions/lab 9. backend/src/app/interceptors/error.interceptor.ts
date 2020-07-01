import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err, caught) => {
                if (err instanceof HttpErrorResponse) {
                    console.error('something went horribly wrong', err);
                    this.toastr.error(`${req.method} ${req.url}<br><br>${err.message}`, 'HTTP error', {
                        enableHtml: true
                    });
                    return of([] as any);
                }
            })
        );
    }
}
