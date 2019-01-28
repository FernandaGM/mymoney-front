import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Entry} from "./entry";
import {environment} from "../../../environments/environment";

const API = environment.ApiUrl;

@Injectable()
export class EntryService {

  constructor(private http: HttpClient) {}

  fetchEntry(id) {
    return this.http.get<Entry>(`${API}/entry/get/${id}`);
  }

  saveEntry(entry: Entry, username: string) {
    return this.http.post<boolean>(`${API}/entry/add/${username}`, entry);
  }

  updateEntry(entry: Entry) {
    return this.http.put<boolean>(`${API}/entry/update/${entry.id}`, entry);
  }
}
