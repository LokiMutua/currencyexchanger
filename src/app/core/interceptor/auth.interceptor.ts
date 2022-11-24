import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addApiKey(request));
  }

  addApiKey(request: HttpRequest<any>){
    const apiKey = environment.API_KEY;

    return request.clone({
      setHeaders: {
        "apikey": apiKey
      }
    })

  }
}
