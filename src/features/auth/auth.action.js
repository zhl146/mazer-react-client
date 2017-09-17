import { createErrorAction, createUpdateAction } from "../../Utils/action-creator";

export const SET_PROFILE = 'SET_PROFILE';
export const AUTH_ERROR = 'AUTH_ERROR';

export const authError = error => createErrorAction(AUTH_ERROR, error);

export const setAuthProfile = (token, user) => createUpdateAction(SET_PROFILE, {token, user});