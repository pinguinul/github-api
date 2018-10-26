import { combineEpics } from 'redux-observable';

// epics
import { fetchProfilesEpic } from './epics';

// reducers
import app from './reducers';

// rootEpic
export const rootEpic = combineEpics(
    fetchProfilesEpic
);

// rootReducer
export const rootReducer = app;
