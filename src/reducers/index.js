import { handle } from 'redux-pack';
import { FETCH_PROFILES } from '../actions';

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
            return handle(state, action, {
                start: prevState => ({
                    ...prevState,
                    isLoading: true,
                }),
                finish: prevState => ({
                    ...prevState,
                    isLoading: false,
                }),
                success: (prevState) => {
                    const myAction = action;
                    const links = Object.keys(myAction.payload.links).map(link => myAction.payload.links[link]);
                    delete myAction.payload.links;
                    const repos = myAction.payload;

                    return {
                        ...prevState,
                        links,
                        repos,
                    };
                },
            });
        default:
            return state;
    }
};
