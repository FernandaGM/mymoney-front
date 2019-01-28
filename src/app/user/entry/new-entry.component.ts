import {Component, OnInit} from "@angular/core";

import {CategoryService} from "../category/category.service";
import {Category} from "../category/category";
import {Entry} from "./entry";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EntryService} from "./entry.service";
import {UserService} from "../../core/user/user.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: "./new-entry.component.html"
})
export class NewEntryComponent implements OnInit {

  categories: Category[] = null;
  entry: Entry;
  form: FormGroup;
  filteredCategories: Category[];

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

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private entryService: EntryService,
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
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
      return category.name.toLowerCase().indexOf(query.toLowerCase()) === 0;
    });

  }

  save(event) {

    event.preventDefault();

    const newEntry = this.form.getRawValue() as Entry;

    this.entryService.saveEntry(newEntry, this.userService.getUserName()).subscribe(ok => {
      if (ok) {
        this.form.reset();
        this.router.navigate(["/user/dashboards"]);
        // Adicionar mensagem
      }
    }, error1 => console.log(error1.getMessage));

  }

}
