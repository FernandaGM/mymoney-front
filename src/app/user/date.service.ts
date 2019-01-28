import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class DateService {

  private monthSubject = new BehaviorSubject<Date>(null);

  constructor() {}

  getMonth() {
    return this.monthSubject.asObservable();
  }

  setMonth(month: Date) {
    this.monthSubject.next(month);
  }
}
