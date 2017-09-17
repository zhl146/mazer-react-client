import { createErrorAction, createUpdateAction } from "../../utils/action-creator";
import { AUTH_ERROR, SET_PROFILE } from "../../store/action-constants";

export const authError = error => createErrorAction(AUTH_ERROR, error);

export const setAuthProfile = (token, user) => createUpdateAction(SET_PROFILE, {token, user});