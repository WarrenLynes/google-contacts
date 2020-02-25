import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  CONTACTS_FEATURE_KEY,
  contactsAdapter,
  ContactsState
} from './contacts.reducer';
import { emptyContact } from '@contacts/core-data';

export const selectContactsState =
  createFeatureSelector<ContactsState>(CONTACTS_FEATURE_KEY);

const { selectAll, selectEntities } = contactsAdapter.getSelectors();

export const selectContactsLoading = createSelector(
  selectContactsState,
  (state: ContactsState) => state.isLoading
);

export const selectAllContacts = createSelector(
  selectContactsState,
  (state: ContactsState) => selectAll(state)
);

export const selectContactsEntities = createSelector(
  selectContactsState,
  (state: ContactsState) => selectEntities(state)
);

export const selectContactId = createSelector(
  selectContactsState,
  (state: ContactsState) => state.selectedContactId
);

export const selectContact = createSelector(
  selectContactsEntities,
  selectContactId,
  (entities, selectedId) => {
    return selectedId ? entities[selectedId] : emptyContact
  }
);
