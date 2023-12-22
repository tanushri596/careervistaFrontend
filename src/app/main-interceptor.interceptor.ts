import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MainInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.url.startsWith('http://localhost:8080/stomp-endpoint') || request.url.startsWith('http://localhost:8080/getMessage'))
    return next.handle(request);
    
   const token = localStorage.getItem("token");
    const authToken = `Bearer ${token}`;

    const req = request.clone({ setHeaders: { Authorization: authToken } });

       return next.handle(req);
  }
}
