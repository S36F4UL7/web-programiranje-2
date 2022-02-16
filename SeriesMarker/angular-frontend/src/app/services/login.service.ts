import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  login(email: string, password: string): Observable<string>{
    return this.http.post<string>('http://localhost:5000/auth/login', {"email": email, "password": password});
  }

  register(email: string, password: string): Observable<any>{
    return this.http.post<any>('http://localhost:5000/auth/register', {"email": email, "password": password});
  }

  isAuthenticated(): boolean
  {
    if (this.cookie.check('token'))
    {
      var token = this.cookie.get('token');
      return !jwtHelper.isTokenExpired(token);
    }

    return false;
  }
}
