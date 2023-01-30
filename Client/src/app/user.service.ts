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
    return this.http.get(this.baseUrl + '/weatherforecast');
  }
}
