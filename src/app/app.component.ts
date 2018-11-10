import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { RpcService } from './rpc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public chart: Chart; 
  @ViewChild('chartElem') chartElem;
  
  constructor(private rpc: RpcService) {
    this.rpc.getConfig().subscribe(data => {
      console.log(data)
      this.config = data;
    })

    this.rpc.getJson().subscribe(data => {
      this.api = data;
    })
  }

  public api: any = {
    "pooladdress": "...",
    "pendingpayments": [],
    "poolfeestotal": 0,
    "poolwithdrawntotal": 0,
    "poolmode": "master",
    "poolrewardtotal": 0,
    "poolheight": 0,
    "lastblocks": [

    ],
    "blocksfound": 0,
    "stakeweight": 0,
    "watchonlytotalbalance": 0,
    "lastpaymentrunheight": 0,
    "lastpayments": [
    ]
  };

  public config: any = {
    "pooladdress": "...",
    "parameters": [
      {
        "minoutputvalue": 0,
        "height": 0,
        "minblocksbetweenpayments": 0,
        "payoutthreshold": 0,
        "stakebonuspercent": 0,
        "poolfeepercent": 0
      }
    ],
    "htmlport": 0,
    "startheight": 0,
    "zmqhost": "...",
    "rewardaddress": "...",
    "htmlhost": "localhost",
    "particlbindir": "...",
    "mode": "...",
    "particldatadir": "...",
    "zmqport": 0,
    "debug": true
  };

  ngOnInit() {
    this.updateChart();
  }

  updateChart(): void {
    let ctx = this.chartElem.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: "Total pooled coins",
          backgroundColor: 'rgb(17, 17, 17,2)',
          borderColor: 'rgb(3, 232, 176,2)',
          borderWidth: 3,
          pointBorderWidth: 5,
          pointBackgroundColor: 'rgba(250, 250, 250,2)',
          pointBorderColor: 'rgba(250, 250, 250,2)',
          data: [
            2000,
            5000,
            1000,
            190,
            900,
            2000,
            1200,
            1600,
            900,
            2000,
            1200,
            3600,
          ],
        }, {
          fill: 'origin',
          label: "Total blocks found",
          backgroundColor: 'rgb(3, 232, 176,2)',
          borderColor: 'rgba(0, 170, 255,2)',
          data: [
            2,
            5,
            10,
            19,
            9,
            20,
            12,
            16,
            9,
            20,
            12,
            16,
          ],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: ""
        },
        tooltips: {
          mode: 'index',
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
              display: false,

            },
            ticks: {
              fontColor: "#CCC",
              fontSize: 14,
              fontFamily: "'Inter UI', sans-serif"
            },
          }],
          yAxes: [{
            stacked: true,
            scaleLabel: {
              display: false,
              labelString: ''
            },
            gridLines: {
              display: false,

            },
            ticks: {
              fontColor: "#CCC",
              fontSize: 14,
              fontFamily: "'Inter UI', sans-serif"
            },
          }]
        }
      }

    });
  }


}
