import { mergeMap, map, switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';

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
export const fetchProfilesSuccess = payload => {
    console.log('fetchProfilesSuccess', payload);
    return ({
        type: FETCH_PROFILES_SUCCESS,
        payload,
    });
};

// epic
export const fetchProfilesEpic = action$ => {
    // console.log('fetchProfilesEpic', action$);
    // return action$;
    // return action$.pipe(
    //     ofType(FETCH_PROFILES),
    //     mergeMap(action =>
    //         ajax.getJSON(`https://api.github.com/users/${action.payload.username}/repos?per_page=${action.payload.reposPerPage}`)
    //         .pipe(
    //             map(resp => fetchProfilesSuccess(resp))
    //         )
    //     )
    // );
    return action$.pipe(
        ofType(FETCH_PROFILES),
        switchMap(action => fetchProfilesAPI(action.payload.username, action.payload.reposPerPage)
        .then(resp => fetchProfilesSuccess(resp)))
    );
};
