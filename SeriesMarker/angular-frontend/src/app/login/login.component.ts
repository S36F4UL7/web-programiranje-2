import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email?: string;
  password?: string;

  constructor(
    private loginService: LoginService, 
    private cookie: CookieService, 
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  login()
  {
    if(!!this.email && !!this.password){
      this.loginService.login(this.email, this.password).subscribe(token => {
        this.cookie.set("token", token);
        
        this.router.navigate(['/series'])
      });
    }
  }

  register()
  {
    if(!!this.email && !!this.password){
      this.loginService.register(this.email, this.password).subscribe(res => {
        this.cookie.set("token", res.token);
        
        this.router.navigate(['/series'])
      });
    }
  }

}
