import { Action, createReducer, createSelector, on } from '@ngrx/store';
import {
  authenticateSuccess,
  authenticateFailure,
  reset,
  logout,
  logoutSuccess,
  logoutFailure, authenticate
} from './auth.actions';
import { AppState } from '@contacts/core-state';

export interface IUser {
  email: string;
  name?: string;
}

export interface IAuthState {
  authenticated: boolean;
  loading: boolean;
  user: any;
  access_token: any;
  refresh_token: any;
}

const initialState: IAuthState = {
  authenticated: false,
  loading: false,
  user: null,
  access_token: null,
  refresh_token: null
};

const reducer = createReducer(
  initialState,
  on(reset, () => ({ ...initialState })),
  on(authenticate, (state, {access_token, refresh_token}) => ({...state, access_token, refresh_token, loading: true})),
  on(authenticateSuccess, (state, {user}) => ({...state, user, authenticated: true, loading: false })),
  on(authenticateFailure, () => ({ ...initialState })),
  on(logout, (state) => ({ ...state, loading: true })),
  on(logoutSuccess, () => ({ ...initialState })),
  on(logoutFailure, () => ({ ...initialState }))
);

export function authReducer(state = initialState, action: Action): IAuthState {
  return reducer(state, action);
}

export const getAuthState = (state: AppState) => state.auth;
export const mapToAuthenticated = (state: IAuthState) => state.authenticated;
export const mapToLoading = (state: IAuthState) => state.loading;
export const authenticated = createSelector(getAuthState, mapToAuthenticated);
export const loading = createSelector(getAuthState, mapToLoading);

