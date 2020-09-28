import { Component, ViewChild, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';

import { Chart } from 'chart.js';
import { environment } from '../environments/environment';
import { RpcService } from './rpc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

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

    public pdstat: any = {
	"status":"...",
	"uptime":"",
	"peers":"",
	"last_block":"",
	"version":"",
	"staking":"",
	"nominal_rate":"0",
	"actual_rate":"0"
    };

  private metrics: any = [
    ];

  // Update timer
  private timer: Observable<number>;
  private seconds: number = 60 * 1000;
  public testnet = environment.testnet;

  // Total coins and block chart
  public chart: Chart;
  public stakingRateHourlyChart: Chart;
  public stakingRateDailyChart: Chart;

  @ViewChild('chartElem') chartElem;
  @ViewChild('chartElem1') chartElem1;
  @ViewChild('chartElem2') chartElem2;

  constructor(private rpc: RpcService) {
    this.update();

    // Periodically update the information displayed on the page
    this.timer = interval(this.seconds);
    this.timer.subscribe((t) => {
      this.update();
    });
  }

  update(): void {
    this.rpc.getConfig().subscribe(data => {
      //console.log(data);
      this.config = data;
    });

    this.rpc.getJson().subscribe(data => {
      this.api = data;
    });

    this.rpc.getParticldStat().subscribe(data => {
      this.pdstat = data;
    });

    this.rpc.getMetrics().subscribe((data: any) => {
      this.metrics = data.reverse();
      const metrics = this.getHumanReadableMetrics(this.metrics);
      this.chart.data.labels = this.getLabelsForMetrics(metrics);
      this.chart.data.datasets[0].data = this.getTotalCoinsForMetrics(metrics);
      this.chart.data.datasets[1].data = this.getBlocksForMetrics(metrics);
      this.chart.update();
    });


    this.rpc.getStakingRate().subscribe((data: any) => {
	this.stakingRateHourlyChart.data.datasets[0].data = this.getPoints(data.hourly, 1);
	this.stakingRateHourlyChart.data.datasets[1].data = this.getPoints(data.hourly, 2);
	this.stakingRateHourlyChart.data.datasets[2].data = this.getPoints(data.hourly, 3);
	this.stakingRateHourlyChart.update();

	this.stakingRateDailyChart.data.datasets[0].data = this.getPoints(data.daily, 1);
	this.stakingRateDailyChart.data.datasets[1].data = this.getPoints(data.daily, 2);
	this.stakingRateDailyChart.data.datasets[2].data = this.getPoints(data.daily, 3);
	this.stakingRateDailyChart.update();
    });

  }

  ngOnInit() {
    this.createChart();
    this.createStakingRateHourlyChart();
    this.createStakingRateDailyChart();
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
          borderColor: 'rgb(69, 212, 146, 2)',
          borderWidth: 3,
          pointBorderWidth: 4,
          pointBackgroundColor: 'rgb(34, 41, 41,2)',
          pointBorderColor: 'rgba(250, 250, 250,2)',
	  yAxisID: 'y-coins',
          data: [],
        }, {
            label: 'Total blocks found',
	    fill: false,
	    pointStyle: 'rect',
	    borderJoinStyle: 'round',
	    lineTension: 0,
	    stepped: false,
	    borderDash: [ 5, 5 ],
            borderColor: 'rgb(69, 212, 146, 2)',
          borderWidth: 3,
          pointBorderWidth: 4,
          pointBackgroundColor: 'rgb(34, 41, 41,2)',
          pointBorderColor: 'rgba(250, 250, 250,2)',
	  yAxisID: 'y-blocks',
          data: [],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Pooled Coins/Found Blocks',
          fontColor: '#CCC'
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
            stacked: false,
	    id: 'y-coins',
            scaleLabel: {
              display: true,
              labelString: 'PART'
            },
            gridLines: {
              display: false
            },
            ticks: {
              fontColor: '#CCC',
              fontSize: 14,
              fontFamily: '\'Inter UI\', sans-serif'
            },
	  },
	  {
            stacked: false,
	    position: 'right',
		id: 'y-blocks',
            scaleLabel: {
              display: true,
              labelString: 'Blocks'
            },
            gridLines: {
              display: false
            },
            ticks: {
              fontColor: '#CCC',
              fontSize: 14,
		fontFamily: '\'Inter UI\', sans-serif',
		suggestedMax: 15,
            }
          }]
        }
      }

    });
  }

    createStakingRateHourlyChart(): void {
	const ctx = this.chartElem1.nativeElement.getContext('2d');
	this.stakingRateHourlyChart = new Chart(ctx, {
	    type: 'line',
	    data: {
		//        labels: [],
		datasets: [{
		    label: 'Average',
		    borderColor: 'rgb(69, 212, 146, 2)',
		    borderWidth: 3,
		    pointBorderWidth: 2,
		    pointBackgroundColor: 'rgb(34, 41, 41,2)',
		    pointBorderColor: 'rgba(250, 250, 250,2)',
		    data: []
		},
		{
		    label: 'Min',
		    borderColor: 'rgb(69, 212, 146, 2)',
		    borderWidth: 2,
		    backgroundColor: 'rgb(80, 80, 80, 2)',
		    pointRadius: 0,
		    pointStyle: 'line',
		    showLine: true,
		    fill: '+1',
		    data: []
		},
		{
		    label: 'Max',
		    borderColor: 'rgb(69, 212, 146, 2)',
		    borderWidth: 2,
		    pointRadius: 0,
		    pointStyle: 'line',
		    showLine: true,
		    data: []
		}]
	    },
	    options: {
		responsive: true,
		maintainAspectRatio: true,
		title: {
		    display: true,
		    text: 'Hourly Effective Staking Rate',
		    fontColor: '#CCC',
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
			type: 'time',
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
			    source: 'data',
			    fontColor: '#CCC',
			    fontSize: 14,
			    fontFamily: '\'Inter UI\', sans-serif'
			},
			time: {
			    parser: 'XZZ',
			    unit: 'hour',
			    tooltipFormat: "HH:mm",
			    displayFormats: {
				hour: 'HH'
			    }
			}
		    }],
		    yAxes: [{
			stacked: false,
			scaleLabel: {
			    display: true,
			    labelString: '%'
			},
			gridLines: {
			    display: false
			},
			ticks: {
			    min: 0,
			    fontColor: '#CCC',
			    fontSize: 14,
			    fontFamily: '\'Inter UI\', sans-serif'
			},
		    }]
		}
	    }

	});
    }

  createStakingRateDailyChart(): void {
    const ctx = this.chartElem2.nativeElement.getContext('2d');
      this.stakingRateDailyChart = new Chart(ctx, {
	    type: 'line',
	    data: {
		//        labels: [],
		datasets: [{
		    label: 'Average',
		    borderColor: 'rgb(69, 212, 146, 2)',
		    borderWidth: 3,
		    pointBorderWidth: 2,
		    pointBackgroundColor: 'rgb(34, 41, 41,2)',
		    pointBorderColor: 'rgba(250, 250, 250,2)',
		    data: []
		},
		{
		    label: 'Min',
		    borderColor: 'rgb(69, 212, 146, 2)',
		    borderWidth: 2,
		    backgroundColor: 'rgb(80, 80, 80, 2)',
		    pointRadius: 0,
		    pointStyle: 'line',
		    showLine: true,
		    fill: '+1',
		    data: []
		},
		{
		    label: 'Max',
		    borderColor: 'rgb(69, 212, 146, 2)',
		    borderWidth: 2,
		    pointRadius: 0,
		    pointStyle: 'line',
		    showLine: true,
		    data: []
		}]
	    },
	    options: {
		responsive: true,
		maintainAspectRatio: true,
		title: {
		    display: true,
		    text: 'Daily Effective Staking Rate',
		    fontColor: '#CCC',
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
			type: 'time',
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
			    source: 'data',
			    fontColor: '#CCC',
			    fontSize: 14,
			    fontFamily: '\'Inter UI\', sans-serif'
			},
			time: {
			    parser: 'X',
			    unit: 'day',
			    tooltipFormat: "YYYY-MM-DD",
			    displayFormats: {
				hour: 'HH'
			    }
			}
		    }],
		    yAxes: [{
			stacked: false,
			scaleLabel: {
			    display: true,
			    labelString: '%'
			},
			gridLines: {
			    display: false
			},
			ticks: {
			    min: 0,
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

  getPoints(data: any, pos) {
      return data.map(record => { return { t: record[0].toString()+'+00', y: record[pos] } });
  }


  getBlockExplorerUrlForBlock(block: string) {
    return `https://explorer${ environment.testnet ?  '-testnet' : ''}.particl.io/block/${block}`;
  }

  getBlockExplorerUrlForTx(tx: string) {
    return `https://explorer${ environment.testnet ?  '-testnet' : ''}.particl.io/tx/${tx}`;
  }

  getBlockExplorerUrlForAdr(adr: string) {
    return `https://explorer${ environment.testnet ?  '-testnet' : ''}.particl.io/address/${adr}`;
  }

}
