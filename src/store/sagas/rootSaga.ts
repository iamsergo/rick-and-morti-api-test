import { all } from 'redux-saga/effects';
import charactersSaga from './characters';

function* rootSaga()
{
  yield all([
    charactersSaga(),
  ]);
}

export default rootSaga;