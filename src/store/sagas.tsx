import { all, fork } from "redux-saga/effects";

import noteSaga from './Note/Saga';

function* rootSagas() {
    yield all([
        fork(noteSaga)
    ]);
}

export default rootSagas;
