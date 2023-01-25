import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getUser(){
    const token = localStorage.getItem('token');
    return this.http.get(this.baseUrl + '/weatherforecast', {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)})
  }
}
