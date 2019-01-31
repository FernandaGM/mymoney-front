import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {Category} from "../category/category";
import {CategoryService} from "../category/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Entry} from "./entry";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EntryService} from "./entry.service";
import {MessageService} from "primeng/api";

@Component({
  templateUrl: "./edit-entry.component.html"
})
export class EditEntryComponent implements OnInit {

  categories: Category[];
  entry: Entry;
  editForm: FormGroup;
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
    clear: "Limpar"
  };

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private entryService: EntryService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      categories => this.categories = categories,
      error => {
        console.log(error);
      }
    );
    this.activatedRoute.params.subscribe(() => {
      this.entry = this.activatedRoute.snapshot.data["entry"];
      if (this.entry) {
        this.editForm = this.formBuilder.group({
          description: [this.entry.description,
            [
              Validators.required,
              Validators.maxLength(40)
            ]
          ],
          value: [this.entry.value,
            [
              Validators.required
            ]
          ],
          isIncome: [this.entry.isIncome,
            []
          ],
          data: [new Date(this.entry.data),
            [
              Validators.required
            ]
          ],
          categories: [this.entry.categories,
            []
          ]
        });
      } else {
        this.messageService.add({severity: "error", summary: "Ops", detail: "Não foi possivel encontrar o lançamento"});
        this.router.navigate(["/dashboard"]);
      }
    }, error => {
      console.log(error);
    });
  }

  filterCategories(event) {
    const query = event.query;

    this.filteredCategories = this.categories.filter(category => {
      return category.name.toLowerCase().indexOf(query.toLowerCase()) === 0 && category.isIncome === this.editForm.get("isIncome").value;
    });

  }

  saveEntry() {
    const entry = this.editForm.getRawValue() as Entry;

    this.entryService.updateEntry(this.entry.id, entry).subscribe(
      ok => {
        if (ok) {
          this.messageService.add({severity: "success", summary: "OK", detail: "Lançamento atualizado"});
          this.router.navigate(["/user/dashboards"]);
        } else {
          this.messageService.add({severity: "error", summary: "Ops", detail: "Não foi possivel atualizar o lançamento"});
        }
      },
      error => {
        console.log(error);
        this.messageService.add({severity: "error", summary: "Ops", detail: "Não foi possivel atualizar o lançamento"});
      }
    );
  }
}
