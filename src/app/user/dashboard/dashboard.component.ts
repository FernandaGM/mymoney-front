import {Component, OnInit} from "@angular/core";
import {DashboardService} from "./dashboard.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: "./dashboard.component.html",
  providers: [
    DashboardService
  ]
})
export class DashboardComponent implements OnInit {

  chartData: any;
  options: any;
  lastEntries: any;

  constructor(private dashboardService: DashboardService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.options =  {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          gridLines: {
            drawBorder: false,
            display: false,
          },
          ticks: {
            max: 90,
            beginAtZero: true,
            display: false
          }
        }],
        xAxes: [{
          barPercentage: 0.6
        }]
      }
    };

    this.activatedRoute.params.subscribe(() => {
      this.chartData = this.activatedRoute.snapshot.data["dados"][0];
      this.lastEntries = this.activatedRoute.snapshot.data["dados"][1];
    });

  }
}
