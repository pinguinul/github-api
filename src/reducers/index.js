// import { handle } from 'redux-pack';
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
        // case FETCH_PROFILES:
        //     // console.log('FETCH_PROFILES');
        //     return state;
        //     // return handle(state, action, {
        //     //     start: prevState => ({
        //     //         ...prevState,
        //     //         isLoading: true,
        //     //     }),
        //     //     finish: prevState => ({
        //     //         ...prevState,
        //     //         isLoading: false,
        //     //     }),
        //     //     success: (prevState) => {
        //     //         const myAction = action;
        //     //         const links = Object.keys(myAction.payload.links).map(link => myAction.payload.links[link]);
        //     //         delete myAction.payload.links;
        //     //         const repos = myAction.payload;

        //     //         return {
        //     //             ...prevState,
        //     //             links,
        //     //             repos,
        //     //         };
        //     //     },
        //     // });
        case FETCH_PROFILES_SUCCESS: {
            const myAction = action;
            // console.log(myAction.payload.links)
            const links = Object.keys(myAction.payload.links).map(link => myAction.payload.links[link]);
            delete myAction.payload.links;
            const repos = myAction.payload;

            console.log('reducer', repos);
            
            // console.log(...state);

            // return {
            //     ...state,
            //     links,
            //     repos,
            //     isLoading: false,
            // };
            return Object.assign({}, state, {
                links,
                repos,
                isLoading: false,
            });
            // return state;
        }

        default:
            return state;
    }
};
