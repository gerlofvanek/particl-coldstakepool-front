import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RpcService {

  constructor(private http: HttpClient) { }

  get url(): string {
    return `${environment.url}`;
  // return `${environment.url}${environment.testnet ? '/api/test' : '/api'}`;
  }
  get infoUrl(): string {
      return `${environment.infoUrl}`;
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

  getParticldStat() {
    return this.http.get(`${this.infoUrl}/stat`);
  }

  getStakingRateHourly() {
    return this.http.get(`${this.infoUrl}/stakingrate/hourly`);
  }

  getStakingRateDaily() {
    return this.http.get(`${this.infoUrl}/stakingrate/daily`);
  }

  getStakingRate() {
    return this.http.get(`${this.infoUrl}/stakingrate`);
  }

}
