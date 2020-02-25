import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';

import { ContactsFacade } from './contacts.facade';
import * as contactsActions from './contacts.actions';
import { Contact, ContactsService, SnackbarService } from '@contacts/core-data';
import { ContactsPartialState } from './contacts.reducer';
import { AppFacade } from '../app/app.facade';

@Injectable()
export class ContactsEffects {
  loadContacts$ = createEffect(() =>
    this.dataPersistence.fetch(contactsActions.loadContacts, {
      run: (
        action: ReturnType<typeof contactsActions.loadContacts>,
        state: ContactsPartialState
      ) => {
        this.appFacade.addLoad('[CONTACTS][LOAD]');
        return this.contactsService.all().pipe(
          tap(() => this.notifyService.openSnackBar('Successfully Loaded Contacts')),
          map((contacts: any) => contactsActions.contactsLoaded({ contacts: contacts})),
          tap(() => this.appFacade.removeLoad('[CONTACTS][LOAD]'))
        );
      },
      onError: (action: ReturnType<typeof contactsActions.loadContacts>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  addContact$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(contactsActions.createContact, {
      run: (
        action: ReturnType<typeof contactsActions.createContact>,
        state: ContactsPartialState
      ) => {
        this.appFacade.addLoad('[CONTACTS][CREATE]');

        return this.contactsService.create(action.contact).pipe(
          map((contact: Contact) => contactsActions.contactCreated({ contact })),
          tap(() => this.notifyService.openSnackBar('Successfully Added a Contact')),
          tap(() => this.appFacade.removeLoad('[CONTACTS][CREATE]'))
        );
      },
      onError: (action: ReturnType<typeof contactsActions.createContact>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  updateContact$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(contactsActions.updateContact, {
      run: (
        action: ReturnType<typeof contactsActions.updateContact>,
        state: ContactsPartialState
      ) => {
        this.appFacade.addLoad('[CONTACTS][UPDATE]');

        return this.contactsService.update(action.contact).pipe(
          map((contact: any) => contactsActions.contactUpdated({ contact: action.contact })),
          tap(() => this.notifyService.openSnackBar('Successfully Updated a Contact')),
          tap(() => this.appFacade.removeLoad('[CONTACTS][UPDATE]'))
        );
      },
      onError: (action: ReturnType<typeof contactsActions.updateContact>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  deleteContact$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(contactsActions.deleteContact, {
      run: (
        action: ReturnType<typeof contactsActions.deleteContact>,
        state: ContactsPartialState
      ) => {
        this.appFacade.addLoad('[CONTACTS][DELETE]');
        return this.contactsService.delete(action.contactId).pipe(
          map((contacts: any[]) => contactsActions.contactDeleted({ contactId: action.contactId, contacts })),
          tap(() => this.notifyService.openSnackBar('Successfully Deleted a Contact')),
          tap(() => this.contactsFacade.loadContacts()),
          tap(() => this.appFacade.removeLoad('[CONTACTS][DELETE]'))
        );
      },
      onError: (action: ReturnType<typeof contactsActions.deleteContact>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ContactsPartialState>,
    private contactsService: ContactsService,
    private contactsFacade: ContactsFacade,
    private notifyService: SnackbarService,
    private appFacade: AppFacade
  ) {}
}
