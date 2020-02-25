import { Injectable } from '@angular/core';
import { Action, select, Store, ActionsSubject } from '@ngrx/store';
import * as fromContacts from './contacts.reducer';
import * as contactsActions from './contacts.actions';
import {
  selectAllContacts,
  selectContact,
  selectContactsLoading
} from './contacts.selectors';
import { Contact } from '@contacts/core-data';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ContactsFacade {
  allContacts$ = this.store.pipe(select(selectAllContacts));
  selectedContact$ = this.store.pipe(select(selectContact));
  contactLoading$ = this.store.pipe(select(selectContactsLoading));

  constructor(
    private store: Store<fromContacts.ContactsPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectContact(selectedContactId: any) {
    this.dispatch(contactsActions.contactSelected({ selectedContactId }));
  }

  loadContacts() {
    this.dispatch(contactsActions.loadContacts());
  }

  createContact(contact: Contact) {
    this.dispatch(contactsActions.createContact({ contact }));
  }

  updateContact(contact: Contact) {
    this.dispatch(contactsActions.updateContact({ contact }));
  }

  deleteContact(contactId: any) {
    this.dispatch(contactsActions.deleteContact({ contactId }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
