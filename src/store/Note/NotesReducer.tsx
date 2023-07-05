import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface NoteState {
    note_data: Category[];
    selectedCategory?: number;
    selectedNote?: number;
}

const initialState: NoteState = {
    note_data: [
        {
            name: "Note 1",
            content: [
                {
                    title: "Note ||",
                    description: "all data found",
                    modifyDate: "Wed Jul 05 2023 21:54:36 GMT+0530 (India Standard Time)"
                }
            ]
        },
        {
            name: "Note 2",
            content: [
                {
                    title: "Note ||",
                    description: "all data found 1",
                    modifyDate: "Wed Jul 05 2023 21:54:36 GMT+0530 (India Standard Time)"
                }
            ]
        },
    ],
    selectedCategory: undefined,
    selectedNote: undefined
}

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        // add notes
        addNote: (
            state,
            action: PayloadAction<{ categoryIndex: number; note: Partial<Content> }>
        ) => {
            const { categoryIndex, note } = action.payload;
            const { title = '', description = '' } = note;
            state.note_data[categoryIndex].content.push({
                title,
                description,
                modifyDate: new Date().toString(),
            });
        },

        // update notes
        updateNote: (
            state,
            action: PayloadAction<{
                categoryIndex: number;
                noteIndex: number;
                note: Partial<Content>;
            }>
        ) => {
            const { categoryIndex, noteIndex, note } = action.payload;
            const { title = '', description = '' } = note;

            const currentChangeNote = state.note_data[categoryIndex].content[noteIndex];

            if (title) currentChangeNote.title = title;

            if (description) currentChangeNote.description = description;

            currentChangeNote.modifyDate = new Date().toString();
        },

        // delete notes
        deleteNote: (
            state,
            action: PayloadAction<{ categoryIndex: number; noteIndex: number }>
        ) => {
            const { categoryIndex, noteIndex } = action.payload;
            state.note_data[categoryIndex].content.splice(noteIndex, 1);
        },

        // select category
        selectCategory: (state, action: PayloadAction<number>) => {
            state.selectedCategory = action.payload;
            state.selectedNote = undefined;
        },

        // select category
        selectNote: (state, action: PayloadAction<number>) => {
            state.selectedNote = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    addNote, updateNote, deleteNote,
    selectCategory, selectNote,
} = noteSlice.actions

export default noteSlice.reducer;
