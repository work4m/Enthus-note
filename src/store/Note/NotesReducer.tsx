import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface NoteState {
    note_data: Category[];
    selectedCategory: number | undefined;
}

const initialState: NoteState = {
    note_data: [
        {
            name: "Note 1",
            content: [
                {
                    title: "Note ||",
                    description: "all data found",
                    modifyDate: "2023-05-31T10:57:48.536Z"
                }
            ]
        },
        {
            name: "Note 2",
            content: [
                {
                    title: "Note ||",
                    description: "all data found",
                    modifyDate: "2023-05-31T10:57:48.536Z"
                }
            ]
        },
    ],
    selectedCategory: undefined,
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
            state.note_data[categoryIndex].content[noteIndex] = {
                title,
                description,
                modifyDate: new Date().toString(),
            };
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
            state.selectedCategory = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    addNote, updateNote, deleteNote,
    selectCategory
} = noteSlice.actions

export default noteSlice.reducer;
