import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Contact, emptyContact } from './contact';

@Injectable({ providedIn: 'root' })
export class ContactsService {

  constructor(private httpClient: HttpClient) { }

  all() {
    return this.httpClient.get('/api/me/contacts').pipe(
      map((x: any) => x.map((xx) => ({...xx, id: xx.resourceName})))
    )
  }

  create(model) {
    return this.httpClient.post('/api/me/contacts', model).pipe(
      map((x: any) => ({...x, id: x.resourceName}))
    );
  }

  getUrlForId(id) {
    return `/api/me/contacts/${id}`;
  }

  update(model) {
    return this.httpClient.put(this.getUrlForId(model.id), model).pipe(
      map((x: any) => ({...x, id: x.resourceName}))
    )
  }

  delete(modelId) {
    return this.httpClient.delete(this.getUrlForId(modelId))
  }
}
