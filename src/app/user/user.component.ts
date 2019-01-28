import {Component, OnInit} from "@angular/core";
import {DateService} from "./date.service";

@Component({
  templateUrl: "./user.component.html"
})
export class UserComponent implements OnInit {

  month: Date;
  pt = {
    firstDayOfWeek: 0,
    dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S", "D"],
    monthNames: [
      "Janeiro", "Fevereiro", "Março", "Abril",
      "Maio", "Junho", "Julho", "Agosto",
      "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    today: "Hoje",
    clear: "Limpar",
    dateFormat: "dd/mm/yy"
  };

  constructor(private dateService: DateService) {}

  ngOnInit(): void {
    this.month = new Date();
    this.dateService.setMonth(this.month);
  }

  selected(val) {
    console.log(this.month);
    console.log(val);

    this.dateService.setMonth(this.month);
  }
}
