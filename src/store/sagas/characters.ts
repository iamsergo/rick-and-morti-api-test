import { put, takeEvery } from "@redux-saga/core/effects";
import api from "../../api";
import { charactersOperations, charactersTypes } from "../ducks/characters";
import { CharacterResponse } from "../../types/api/characters";

function* fetchCharacters(action: any)
{
  try
  {
    const params = action.payload;
    const data: CharacterResponse = yield api.characters.getCharacters(params);
    if(data.error)
    {
      yield put(charactersOperations.fetchCharactersSuccess({ info: null, results: [] }));
    }
    else
    {
      yield put(charactersOperations.fetchCharactersSuccess(data));
    }
  }
  catch (err)
  {    
    yield put(charactersOperations.fetchCharactersFail());
  }
}

function* charactersSaga()
{
  yield takeEvery(charactersTypes.FETCH_CHARACTERS, fetchCharacters);
}

export default charactersSaga;