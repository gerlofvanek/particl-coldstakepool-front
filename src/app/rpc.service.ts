import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RpcService {
  private customUrl =  'http://144.202.17.55';// 'http://66.172.10.231:901';
  private testnet = false;

  constructor(private http: HttpClient) { }

  get url(): string {
    return `${this.customUrl}${this.testnet ? '/test' : ''}`;
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
