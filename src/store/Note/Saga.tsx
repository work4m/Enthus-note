import { takeEvery, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
    ADD_NOTE, DELETE_NOTE, UPDATE_NOTE,
    ADD_CATEGORY, DELETE_CATEGORY, SELECT_CATEGORY, UPDATE_CATEGORY, SELECT_NOTE,
} from './NoteTypes';
import {
    addNote, updateNote, deleteNote,
    selectCategory, selectNote,
} from './NotesReducer';

// Worker sagas
function* addNoteSaga(action: PayloadAction<{ categoryIndex: number; note: Partial<Content> }>) {
    const { categoryIndex, note } = action.payload;
    yield put(addNote({ categoryIndex, note }));
}

function* updateNoteSaga(action: PayloadAction<{ categoryIndex: number; noteIndex: number; note: Partial<Content> }>) {
    const { categoryIndex, noteIndex, note } = action.payload;
    yield put(updateNote({ categoryIndex, noteIndex, note }));
}

function* deleteNoteSaga(action: PayloadAction<{ categoryIndex: number; noteIndex: number }>) {
    const { categoryIndex, noteIndex } = action.payload;
    yield put(deleteNote({ categoryIndex, noteIndex }));
}

function* selectNoteSaga(action: PayloadAction<number>) {
    yield put(selectNote(action.payload));
}

// category saga
function* selectCategorySaga(action: PayloadAction<number>) {
    yield put(selectCategory(action.payload));
}

// Watcher saga
function* noteSaga() {
    yield takeEvery(ADD_NOTE, addNoteSaga);
    yield takeEvery(UPDATE_NOTE, updateNoteSaga);
    yield takeEvery(DELETE_NOTE, deleteNoteSaga);

    yield takeEvery(SELECT_NOTE, selectNoteSaga);

    yield takeEvery(SELECT_CATEGORY, selectCategorySaga);

    yield takeEvery(ADD_CATEGORY, addNoteSaga);
    yield takeEvery(DELETE_CATEGORY, deleteNoteSaga);
    yield takeEvery(UPDATE_CATEGORY, updateNoteSaga);
}

export default noteSaga;
