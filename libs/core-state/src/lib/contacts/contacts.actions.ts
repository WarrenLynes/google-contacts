import { createAction, props } from '@ngrx/store';

import { Contact } from '@contacts/core-data';

export const contactSelected = createAction(
  '[CONTACT][SELECTED]',
  props<{ selectedContactId: string }>()
);
export const loadContacts = createAction(
  '[CONTACT][LOAD]'
);
export const contactsLoaded = createAction(
  '[CONTACT][LOADED]',
  props<{ contacts: any[] }>()
);
export const createContact = createAction(
  '[CONTACT][CREATE]',
  props<{ contact: any }>()
);
export const contactCreated = createAction(
  '[CONTACT][CREATED]',
  props<{ contact: any }>()
);
export const updateContact = createAction(
  '[CONTACT][UPDATE]',
  props<{ contact: any }>()
);
export const contactUpdated = createAction(
  '[CONTACT][UPDATED]',
  props<{ contact: any }>()
);
export const deleteContact = createAction(
  '[CONTACT][DELETE]',
  props<{ contactId: any }>()
);
export const contactDeleted = createAction(
  '[CONTACT][DELETED]',
  props<{ contactId: any, contacts: any[] }>()
);
