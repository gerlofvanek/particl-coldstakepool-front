var ctx = document.getElementById("chart-particl").getContext('2d');
var myChart = new Chart(ctx, {
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