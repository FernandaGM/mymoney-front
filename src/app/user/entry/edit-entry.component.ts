import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {Category} from "../category/category";
import {CategoryService} from "../category/category.service";
import {ActivatedRoute} from "@angular/router";
import {Entry} from "./entry";

@Component({
  templateUrl: "./edit-entry.component.html"
})
export class EditEntryComponent implements OnInit {

  categories$: Observable<Category[]>;
  entry: Entry;

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    this.activatedRoute.params.subscribe(() => {
      this.entry = this.activatedRoute.snapshot.data["entry"];
    }, error => {
      console.log(error);
    });
  }
}
