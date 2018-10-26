import { FETCH_PROFILES, FETCH_PROFILES_SUCCESS } from '../epics';

const initialState = {
    username: '',
    isLoading: false,
    repos: [],
    links: [],
    reposPerPage: 1,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROFILES:
            return {
                ...state,
                isLoading: true,
            }

        case FETCH_PROFILES_SUCCESS: {
            const myAction = action;
            const links = Object.keys(myAction.payload.links).map(link => myAction.payload.links[link]);
            delete myAction.payload.links;
            const repos = myAction.payload;

            return {
                ...state,
                links,
                repos,
                isLoading: false,
            };
        }

        default:
            return state;
    }
};
