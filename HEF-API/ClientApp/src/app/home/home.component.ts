import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
    private router: Router,
    private jwtHelper: JwtHelperService) { }

  getNavStr(value: string): string {
    return value === 'Stjórnandi' ? 'stjornandi'
         : value === 'Verkaðili'  ? 'verkadili'
         : null;
  }

  ngOnInit() {
    const token = localStorage.getItem('jwt');
    if (!this.jwtHelper.isTokenExpired(token)) {
      const role = localStorage.getItem('role');
      this.router.navigate(['/' + this.getNavStr(role)]);
    }
  }

  onSubmit() {
    const credentials = JSON.stringify(this.loginForm.value);
    this.http.post('/api/auth/login', credentials, this.httpOptions).subscribe(response => {
      const token = (<any>response).token;
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken['Role'];
      const user = decodedToken['User'];

      localStorage.setItem('jwt', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', user);

      this.router.navigate(['/' + this.getNavStr(role)]);

    }, err => {
      console.log('Error:', err);
        console.log('Invalid login');
    });
  }

}
