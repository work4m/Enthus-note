import { takeEvery, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
    ADD_NOTE, DELETE_NOTE, UPDATE_NOTE,
    ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY,
    SELECT_CATEGORY, SELECT_NOTE,
} from './NoteTypes';
import {
    addNote, updateNote, deleteNote,
    addFolder, updateFolder, deleteFolder,
    selectCategory, selectNote,
} from './NotesReducer';

// Worker sagas

// folder actions saga
function* addFolderSaga(action: PayloadAction<{ name: string }>) {
    const { name } = action.payload;
    yield put(addFolder({ name }));
}

function* updateFolderSaga(action: PayloadAction<{ categoryIndex: number; updatedName: string }>) {
    const { categoryIndex, updatedName } = action.payload;
    yield put(updateFolder({ categoryIndex, updatedName }));
}

function* deleteFolderSaga(action: PayloadAction<{ categoryIndex: number }>) {
    const { categoryIndex } = action.payload;
    yield put(deleteFolder({ categoryIndex }));
}

// note actions saga
function* addNoteSaga(action: PayloadAction<{ categoryIndex: number; note: Partial<Content> }>) {
    yield put(addNote());
}

function* updateNoteSaga(action: PayloadAction<{ categoryIndex: number; noteIndex: number; note: Partial<Content> }>) {
    const { categoryIndex, noteIndex, note } = action.payload;
    yield put(updateNote({ categoryIndex, noteIndex, note }));
}

function* deleteNoteSaga() {
    yield put(deleteNote());
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

    yield takeEvery(ADD_CATEGORY, addFolderSaga);
    yield takeEvery(DELETE_CATEGORY, deleteFolderSaga);
    yield takeEvery(UPDATE_CATEGORY, updateFolderSaga);
}

export default noteSaga;
