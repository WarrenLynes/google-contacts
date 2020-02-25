import { ActionReducerMap } from '@ngrx/store';

import { appReducer, IAppState } from './app/app.reducer';
import { authReducer, IAuthState } from './auth/auth.reducer';
import * as fromContacts from './contacts/contacts.reducer';

export interface AppState {
  app: IAppState;
  auth: IAuthState;
  contacts: fromContacts.ContactsState;
}

export const reducers: ActionReducerMap<AppState> = {
  app: appReducer,
  auth: authReducer,
  contacts: fromContacts.reducer,
};

export const defaultState: AppState = {
  app: null,
  auth: null,
  contacts: {ids: [] } as fromContacts.ContactsState,
};
