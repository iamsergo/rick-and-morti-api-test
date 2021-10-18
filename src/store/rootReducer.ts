import { combineReducers } from 'redux';

import charactersReducer from './ducks/characters';

const rootReducer = combineReducers({
  characters: charactersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;