import {Component, OnInit} from "@angular/core";

import {CategoryService} from "../category/category.service";
import {Category} from "../category/category";
import {Entry} from "./entry";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EntryService} from "./entry.service";
import {UserService} from "../../core/user/user.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  templateUrl: "./new-entry.component.html"
})
export class NewEntryComponent implements OnInit {

  categories: Category[] = null;
  entry: Entry;
  form: FormGroup;
  filteredCategories: Category[];

  money: RegExp = /[0-9]+\.[0-9]{2}$/;

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
    clear: "Limpar"
  };

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private entryService: EntryService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      categories => this.categories = categories,
      error => {
        console.log(error);
      }
    );
    this.form = this.formBuilder.group({
      description: ["",
        [
          Validators.required,
          Validators.maxLength(40)
        ]
      ],
      value: ["",
        [
          Validators.required
        ]
      ],
      isIncome: ["N",
        []
      ],
      data: [new Date(),
        [
          Validators.required
        ]
      ],
      categories: [[],
        []
      ]
    });
  }

  filterCategories(event) {
    const query = event.query;

    this.filteredCategories = this.categories.filter(category => {
      return category.name.toLowerCase().indexOf(query.toLowerCase()) === 0 && category.isIncome === this.form.get("isIncome").value;
    });

  }

  save(event) {

    event.preventDefault();

    const newEntry = this.form.getRawValue() as Entry;

    console.log(newEntry);

    this.entryService.saveEntry(newEntry, this.userService.getUserName())
      .subscribe(ok => {
        if (ok) {
          this.form.reset();
          this.router.navigate(["/user/dashboards"]);
          this.messageService.add({severity: "success", summary: "OK", detail: "Criada com sucesso"});
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Ops",
            detail: "Não foi possivel criar a " + (newEntry.isIncome === "S" ? "receita" : "despesa")
          });
        }
      }, error1 => {
        console.log(error1.getMessage);
        this.messageService.add({severity: "error", summary: "Ops", detail: "Ocorreu um erro de comunicação"});
      });

  }

}
