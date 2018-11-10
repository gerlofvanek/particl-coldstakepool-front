import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RpcService {

  constructor(private http: HttpClient) {}
 
  // Uses http.get() to load data from a single API endpoint
  getConfig() {
      return this.http.get('http://66.172.10.231:900/config');
  }

  getJson() {
    return this.http.get('http://66.172.10.231:900/json/');
}
}
