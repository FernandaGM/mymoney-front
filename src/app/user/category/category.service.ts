import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {Category} from "./category";

const API = environment.ApiUrl;

@Injectable()
export class CategoryService {

  private categorySubject = new BehaviorSubject<Category[]>(null);

  constructor(private http: HttpClient) {
    this.http.get(API + "/categories/getall")
      .subscribe(resp => {
        this.categorySubject.next(resp);
      });
  }

  getCategories() {
    return this.categorySubject.asObservable();
  }
}
