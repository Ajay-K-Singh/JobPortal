import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('currentUser');
    console.log(token);
    const authRequest = req.clone({
      headers: req.headers.set("authorization", `Bearer ${token}`)
    });
    return next.handle(authRequest);
  }
}