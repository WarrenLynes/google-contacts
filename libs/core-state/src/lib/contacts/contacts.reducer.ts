import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as contactsActions from './contacts.actions';
import { Contact } from '@contacts/core-data';

export const CONTACTS_FEATURE_KEY = 'contacts';

export interface ContactsState extends EntityState<Contact> {
  selectedContactId?: string | number;
  isLoading: boolean;
}

export interface ContactsPartialState {
  readonly [CONTACTS_FEATURE_KEY]: ContactsState;
}

export const contactsAdapter: EntityAdapter<Contact> = createEntityAdapter<Contact>();

export const initialState: ContactsState = contactsAdapter.getInitialState({
  selectedContactId: null,
  isLoading: false
});

const contactsReducer = createReducer(
  initialState,
  on(contactsActions.contactSelected, (state, { selectedContactId }) =>
    Object.assign({}, state, { selectedContactId })
  ),
  on(contactsActions.contactsLoaded, (state, { contacts }) =>
    contactsAdapter.addAll(contacts, { ...state, isLoading: false })
  ),
  on(contactsActions.contactCreated, (state, { contact }) =>
    contactsAdapter.addOne(contact, { ...state, isLoading: false })
  ),
  on(contactsActions.contactUpdated, (state, { contact }) =>
    contactsAdapter.upsertOne(contact, { ...state, isLoading: false })
  ),
  on(contactsActions.contactDeleted, (state, { contactId }) =>
    contactsAdapter.removeOne(contactId, { ...state, isLoading: false })
  ),
  on(
    contactsActions.loadContacts,
    contactsActions.createContact,
    contactsActions.updateContact,
    contactsActions.deleteContact,
    (state) => ({
      ...state,
      isLoading: true
    })
  ),
);

export function reducer(state: ContactsState | undefined, action: Action) {
  return contactsReducer(state, action);
}
