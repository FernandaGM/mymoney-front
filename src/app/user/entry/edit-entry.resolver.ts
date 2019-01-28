import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

import {EntryService} from "./entry.service";
import {Entry} from "./entry";

@Injectable({ providedIn: "root" })
export class EditEntryResolver implements Resolve<Observable<Entry>> {

  constructor(private service: EntryService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Entry> {
    const id = route.params.id;
    return this.service.fetchEntry(id);
  }

}
