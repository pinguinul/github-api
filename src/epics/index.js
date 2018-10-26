import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import fetchProfilesAPI from '../api';

// action creators
export const FETCH_PROFILES = 'FETCH_PROFILES';
export const FETCH_PROFILES_SUCCESS = 'FETCH_PROFILES_SUCCESS';
export const fetchProfiles = (username, reposPerPage, page, orderBy, direction) => (
    {
        type: FETCH_PROFILES,
        payload: {
            username,
            reposPerPage,
            page,
            orderBy,
            direction,
        },
    }
);
export const fetchProfilesSuccess = payload => ({
    type: FETCH_PROFILES_SUCCESS,
    payload,
});

// epics
export const fetchProfilesEpic = action$ => action$.pipe(
    ofType(FETCH_PROFILES),
    switchMap(action => {
        const { username, reposPerPage, page, orderBy, direction } = action.payload;

        return fetchProfilesAPI(username, reposPerPage, page, orderBy, direction)
        .then(resp => fetchProfilesSuccess(resp));
    })
);
