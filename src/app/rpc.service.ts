import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RpcService {

  constructor(private http: HttpClient) { }

  get url(): string {
    return `${environment.url}${environment.testnet ? '/api/test' : '/api'}`;
  }
  // Uses http.get() to load data from a single API endpoint
  getConfig() {
    return this.http.get(`${this.url}/config`);
  }

  getJson() {
    return this.http.get(`${this.url}/json`);
  }

  getMetrics() {
    return this.http.get(`${this.url}/json/metrics`);
  }
}
