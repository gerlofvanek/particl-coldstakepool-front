import { Component, ViewChild, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';

import { Chart } from 'chart.js';
import { environment } from '../environments/environment'
import { RpcService } from './rpc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Update timer
  private timer: Observable<number>;
  private seconds: number = 60 * 1000;
  private testnet = environment.testnet;

  // Total coins and block chart
  public chart: Chart;
  @ViewChild('chartElem') chartElem;

  constructor(private rpc: RpcService) {
    this.update();

    // Periodically update the information displayed on the page
    this.timer = interval(this.seconds);
    this.timer.subscribe((t) => {
      this.update()
    });
  }

  update(): void {
    this.rpc.getConfig().subscribe(data => {
      console.log(data);
      this.config = data;
    });

    this.rpc.getJson().subscribe(data => {
      this.api = data;
    });

    this.rpc.getMetrics().subscribe((data: any) => {
      this.metrics = data.reverse();
      const metrics = this.getHumanReadableMetrics(this.metrics);
      this.chart.data.labels = this.getLabelsForMetrics(metrics);
      this.chart.data.datasets[0].data = this.getTotalCoinsForMetrics(metrics);
      this.chart.data.datasets[1].data = this.getBlocksForMetrics(metrics);
      this.chart.update();
    });
  }


  public api: any = {
    'pooladdress': '...',
    'pendingpayments': [],
    'poolfeestotal': 0,
    'poolwithdrawntotal': 0,
    'poolmode': 'master',
    'poolrewardtotal': 0,
    'poolheight': 0,
    'lastblocks': [

    ],
    'blocksfound': 0,
    'stakeweight': 0,
    'stakedbalance': 0,
    'connections': 0,
    'watchonlytotalbalance': 0,
    'lastpaymentrunheight': 0,
    'lastpayments': [
    ]
  };

  public config: any = {
    'pooladdress': '...',
    'parameters': [
      {
        'minoutputvalue': 0,
        'height': 0,
        'minblocksbetweenpayments': 0,
        'payoutthreshold': 0,
        'stakebonuspercent': 0,
        'poolfeepercent': 0
      }
    ],
    'htmlport': 0,
    'startheight': 0,
    'zmqhost': '...',
    'rewardaddress': '...',
    'htmlhost': 'localhost',
    'particlbindir': '...',
    'mode': '...',
    'particldatadir': '...',
    'zmqport': 0,
    'debug': true
  };

  private metrics: any = [
    ];

  ngOnInit() {
    this.createChart();
  }

  /**
   * TODO: don't rewrite the charts o nevery update, rather just update the data as a global variable
   * It's rather slow currently
   */
  createChart(): void {
    const ctx = this.chartElem.nativeElement.getContext('2d');
	
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Total pooled coins',
          borderColor: 'rgb(3, 232, 176,2)',
          borderWidth: 3,
          pointBorderWidth: 4,
          pointBackgroundColor: 'rgb(34, 41, 41,2)',
          pointBorderColor: 'rgba(250, 250, 250,2)',
          data: [],
        }, {
          fill: 'origin',
          label: 'Total blocks found',
          data: [],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: ''
        },
        tooltips: {
          mode: 'index',
		  displayColors: false
        },
        hover: {
          mode: 'index'
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            stacked: true,
            scaleLabel: {
              display: false,
              labelString: ''
			  
            },
            gridLines: {
              display: true,
			  color: 'rgb(34, 41, 41,2)',
              lineWidth: 0.5
            },
            ticks: {
              fontColor: '#CCC',
              fontSize: 14,
              fontFamily: '\'Inter UI\', sans-serif'
            },
          }],
          yAxes: [{
            stacked: true,
            scaleLabel: {
              display: false,
              labelString: ''
            },
            gridLines: {
              display: false
            },
            ticks: {
              fontColor: '#CCC',
              fontSize: 14,
              fontFamily: '\'Inter UI\', sans-serif'
            },
          }]
        }
      }

    });
  }


  /**
   * Takes the metrics provided by the pool page and formats them to a more
   * human readable format and fit for usage in charts.
   * @param metric 
   */
  getHumanReadableMetrics(metric: any) {
    const m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return metric.map(record => {

      // 2018-11 -> 11 -> November
      const month = m[+record[0].split('-')[1] - 1];

      const total_coins = (record[2] / 100000000).toFixed(3);
      return [month, record[1], total_coins];
    });
  }

  getLabelsForMetrics(hrMetrics: any) {
    return hrMetrics.map(record => record[0]);
  }

  getBlocksForMetrics(hrMetrics: any) {
    return hrMetrics.map(record => record[1]);
  }

  getTotalCoinsForMetrics(hrMetrics: any) {
    return hrMetrics.map(record => record[2]);
  }


  getBlockExplorerUrlForBlock(block: string) {
    return `https://explorer${ environment.testnet ?  "-testnet" : ""}.particl.io/block/${block}`;
  }

  getBlockExplorerUrlForTx(tx: string) {
    return `https://explorer${ environment.testnet ?  "-testnet" : ""}.particl.io/tx/${tx}`;
  }
}
