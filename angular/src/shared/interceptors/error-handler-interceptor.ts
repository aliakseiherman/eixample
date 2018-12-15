import { Observable } from 'rxjs/Rx';

import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(
        private toastr: ToastrService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(req)
            .catch(this.handleError)
    }

    public handleError = (error: Response) => {

        let reader = new FileReader();

        let toastr = this.toastr;

        reader.onload = function () {

            var result = JSON.parse(this.result as string);

            toastr.error(result.error, 'Warning!');
        };

        reader.readAsText(error['error']);

        return Observable.throw(error)
    }
}

