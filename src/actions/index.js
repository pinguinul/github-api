import fetchProfilesAPI from '../api';

export const FETCH_PROFILES = 'FETCH_PROFILES';
export const fetchProfiles = (username, reposPerPage, page, orderBy, direction) => ({
    type: FETCH_PROFILES,
    promise: fetchProfilesAPI(username, reposPerPage, page, orderBy, direction),
});
