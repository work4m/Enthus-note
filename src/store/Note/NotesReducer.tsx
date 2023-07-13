import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface NoteState {
    note_data: Category[];
    selectedCategory: number;
    selectedNote: number;
}

const initialState: NoteState = {
    note_data: [
        {
            name: "General",
            content: []
        }
    ],
    selectedCategory: -1,
    selectedNote: -1
}

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        // ! Folders
        // add folder
        addFolder: (
            state,
            action: PayloadAction<{ name: string }>
        ) => {
            const { name } = action.payload;

            const newCategoryFolder: Category = {
                name,
                content: []
            };

            state.note_data?.push(newCategoryFolder);
        },

        // update folder
        updateFolder: (
            state,
            action: PayloadAction<{
                categoryIndex: number,
                updatedName: string
            }>
        ) => {
            const { categoryIndex, updatedName } = action.payload;
            state.note_data[categoryIndex].name = updatedName;
        },

        // delete folder
        deleteFolder: (
            state,
            action: PayloadAction<{
                categoryIndex: number;
            }>
        ) => {
            const { categoryIndex } = action.payload;
            state.note_data.splice(categoryIndex, 1);
        },

        // ! NOTES
        // add notes
        addNote: (
            state
        ) => {
            const categoryIndex = state.selectedCategory || 0;

            state.note_data[categoryIndex].content.push({
                title: "",
                description: "",
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

            currentChangeNote.description = description;

            currentChangeNote.modifyDate = new Date().toString();
        },

        // delete notes
        deleteNote: (
            state,
        ) => {
            const selectedFolderIndex = state.selectedCategory;
            const selectedNoteIndex = state.selectedNote;
            
            if (selectedFolderIndex > -1 && selectedNoteIndex > -1) {
                state.note_data[selectedFolderIndex].content.splice(selectedNoteIndex, 1);
                state.selectedNote = -1;
            }
        },

        // select category
        selectCategory: (state, action: PayloadAction<number>) => {
            state.selectedCategory = action.payload;
            state.selectedNote = -1;
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
    addFolder, updateFolder, deleteFolder,
    selectCategory, selectNote,
} = noteSlice.actions

export default noteSlice.reducer;
