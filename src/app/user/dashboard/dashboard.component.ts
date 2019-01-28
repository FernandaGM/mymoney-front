import {Component, OnInit} from "@angular/core";
import {DashboardService} from "./dashboard.service";
import {ActivatedRoute} from "@angular/router";
import {Entry} from "../entry/entry";
import {Observable} from "rxjs";
import {DateService} from "../date.service";
import {UserService} from "../../core/user/user.service";

@Component({
  templateUrl: "./dashboard.component.html",
  providers: [
    DashboardService
  ]
})
export class DashboardComponent implements OnInit {

  chartData: any;
  options: any;
  lastEntries: Entry[];

  constructor(private dashboardService: DashboardService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private dateService: DateService) {}

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
            max: 0,
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
      if (this.activatedRoute.snapshot.data["dados"].length > 0) {
        this.chartData = this.activatedRoute.snapshot.data["dados"][0];
        this.lastEntries = this.activatedRoute.snapshot.data["dados"][1].filter(entry => entry != null);
        this.options.scales.yAxes[0].ticks.max = this.activatedRoute.snapshot.data["dados"][2];
      } else {
        this.chartData = [];
        this.lastEntries = [];
      }

    });

    this.dateService.getMonth().subscribe(month => {
      if (month != null) {
        this.dashboardService.getDados(this.userService.getUserName(), month).subscribe((dados: any[]) => {
          if (dados.length > 0) {
            this.chartData = dados[0];
            this.lastEntries = dados[1].filter(entry => entry != null);
            this.options.scales.yAxes[0].ticks.max = dados[2];
          } else {
            this.chartData = [];
            this.lastEntries = [];
          }
        });
      } else {
        this.chartData = [];
        this.lastEntries = [];
      }
    });

  }
}
