import { Action } from '@reduxjs/toolkit';

export interface UserState {
  loading: boolean;
  error: string | null;
  user: Record<string, unknown> | null;
  userType: string | null;
}

export interface ModalState {
  forgotPassword: boolean;
}

export interface RootState {
  user: UserState;
  isOpen: ModalState;
}

export type AppReducer<S> = (state: S | undefined, action: Action) => S;
