import {Pipe, PipeTransform} from "@angular/core";
import {Entry} from "./entry/entry";


@Pipe({name: "filterByDescription"})
export class FilterByDescription implements PipeTransform {

  transform(entries: Entry[], descriptionQuery: string): any {
    descriptionQuery = descriptionQuery
      .trim()
      .toLowerCase();

    if (descriptionQuery) {
      return entries.filter(entry =>
        entry.description.toLowerCase().includes(descriptionQuery)
      );
    }

    return entries;
  }

}
