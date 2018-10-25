import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

// epics
import { fetchProfilesEpic } from './epics';

// reducers
import app from './reducers';


export const rootEpic = combineEpics(
    fetchProfilesEpic
);

export const rootReducer = combineReducers({
    app,
});

