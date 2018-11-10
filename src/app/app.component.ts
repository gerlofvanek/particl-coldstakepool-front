import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public chart: Chart; 
  @ViewChild('chartElem') chartElem;
  
  public api: any = {
    "pooladdress": "pcs14ch7w7ue2q8kadljsl42wehfw8tm99yxsez4kz",
    "pendingpayments": [],
    "poolfeestotal": 3586099,
    "poolwithdrawntotal": 0,
    "poolmode": "master",
    "poolrewardtotal": 236056657,
    "poolheight": 322439,
    "lastblocks": [
      [
        321485,
        "b86c19a908c83b5a311140d5959197ea70e37cfdd2f84d126ffc58f0e419943d",
        125373550,
        865655823208
      ],
      [
        321357,
        "770549f36c1487c427e5719ab1d5dc78dcb4245520614f50a4c3005b9452a9c9",
        125371000,
        865655823208
      ],
      [
        320172,
        "370d5a0490618abb3e7361e5ed7a9442855f3ae4bf866385f74db5bba13e161b",
        125348480,
        865655823208
      ],
      [
        320129,
        "df839f38be192a1cbff95cc85c09ad3d481e3f82dfed9d4881fc1e65bf9f382b",
        125347620,
        865655823208
      ],
      [
        317646,
        "69d903a805ed400cf722cad996fddbb35091394a1d5bdfb6702b2011ea1083ee",
        125300290,
        865655823208
      ]
    ],
    "blocksfound": 63,
    "stakeweight": 865655823208,
    "watchonlytotalbalance": 8656.55823208,
    "lastpaymentrunheight": 322401,
    "lastpayments": [
      [
        321602,
        "fb9ff3e5cf55f91a6527c2a5d3f0907a3ab5f1eee3ec779967a150c6c5510310",
        146175356
      ],
      [
        321502,
        "532ac697fa507c193f860aea67bd113cbe60bebdf2e48103a315fd341a1ca56d",
        117983906
      ],
      [
        320302,
        "f546e2deea4082dde406d0df150513564509d98737a7a71c57dcf050681aee10",
        214079234
      ],
      [
        317802,
        "4355052337c72a3c8e80dd8567505212e6333cdee0fdeeb725d3f1dce27cb01f",
        139822512
      ],
      [
        317402,
        "258f819c19b691d7fd743383dfb89265a55755cd63dd2a7a99548c2bf15f25e3",
        117058808
      ]
    ]
  };

  public config: any = {
    "pooladdress": "pcs14ch7w7ue2q8kadljsl42wehfw8tm99yxsez4kz",
    "parameters": [
      {
        "minoutputvalue": 0.1,
        "height": 0,
        "minblocksbetweenpayments": 100,
        "payoutthreshold": 0.5,
        "stakebonuspercent": 5,
        "poolfeepercent": 3
      }
    ],
    "htmlport": 9000,
    "startheight": 254000,
    "zmqhost": "tcp://127.0.0.1",
    "rewardaddress": "PbXgDsRurjpCYXxNryin13h86ufks9zh6o",
    "htmlhost": "localhost",
    "particlbindir": "/home/stakepooluser/particlAlpha",
    "mode": "master",
    "particldatadir": "/home/stakepooluser/stakepoolDemoLive",
    "zmqport": 207922,
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
