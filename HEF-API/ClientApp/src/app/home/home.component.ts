import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  invalidLogin: boolean = null;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router ) { }

  onSubmit() {
    const credentials = JSON.stringify(this.loginForm.value);
    this.http.post('/api/auth/login', credentials, this.httpOptions).subscribe(response => {
      const token = (<any>response).token;
      const role = (<any>response).role;
      const userId = (<any>response).id;
      localStorage.setItem('role', role);
      localStorage.setItem('jwt', token);
      localStorage.setItem('user', userId);
      this.invalidLogin = false;
      if (role === 1) {
        this.router.navigate(['/verkadili']);
      } else if (role === 2) {
        this.router.navigate(['/stjornandi']);
      }
    }, err => {
      this.invalidLogin = true;
    });
  }

}
