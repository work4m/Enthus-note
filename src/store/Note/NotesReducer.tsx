import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface NoteState {
    note_data: Category[];

    selectedCategory: number;
    selectedNote: number;

    latestNewFolderNumber: number;
    latestNewNoteNumber: number;
}

const initialState: NoteState = {
    note_data: [
        {
            id: 0,
            name: "General",
            content: []
        }
    ],

    selectedCategory: -1,
    selectedNote: -1,

    latestNewFolderNumber: 0,
    latestNewNoteNumber: -1,
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

            const newFolderNumber = state.latestNewFolderNumber + 1;

            const newCategoryFolder: Category = {
                id: newFolderNumber,
                name,
                content: []
            };

            state.latestNewFolderNumber = newFolderNumber;

            state.selectedCategory = newFolderNumber;

            state.note_data?.push(newCategoryFolder);
        },

        // update folder
        updateFolder: (
            state,
            action: PayloadAction<{
                categoryId: number,
                updatedName: string
            }>
        ) => {
            const { categoryId, updatedName } = action.payload;

            const findFolderIndex = state.note_data.findIndex(x => x.id === categoryId);

            state.note_data[findFolderIndex].name = updatedName;
        },

        // delete folder
        deleteFolder: (
            state,
            action: PayloadAction<{
                categoryId: number;
            }>
        ) => {
            const { categoryId } = action.payload;

            const findFolderIndex = state.note_data.findIndex(x => x.id === categoryId);

            state.note_data.splice(findFolderIndex, 1);
        },

        // ! NOTES
        // add notes
        addNote: (
            state
        ) => {
            const categoryIndex = state.selectedCategory || 0;

            const newNoteNumber = state.latestNewNoteNumber + 1;

            state.note_data[categoryIndex].content.push({
                id: newNoteNumber,
                title: "",
                description: "",
                modifyDate: new Date().toString(),
            });

            state.latestNewNoteNumber = newNoteNumber;

            state.selectedNote = newNoteNumber;
        },

        // update notes
        updateNote: (
            state,
            action: PayloadAction<{
                note: Partial<Content>;
            }>
        ) => {
            const { note } = action.payload;
            const { title = '', description = '' } = note;

            const selectedFolderId = state.selectedCategory;
            const selectedNoteId = state.selectedNote;

            const findFolderIndex = state.note_data.findIndex(x => x.id === selectedFolderId);
            
            const findNoteIndex = state.note_data[findFolderIndex].content.findIndex(x => x.id === selectedNoteId);
            
            const currentChangeNote = state.note_data[findFolderIndex].content[findNoteIndex];

            if (title) currentChangeNote.title = title;

            currentChangeNote.description = description;

            currentChangeNote.modifyDate = new Date().toString();
        },

        // delete notes
        deleteNote: (
            state
        ) => {
            const selectedFolderId = state.selectedCategory;
            const selectedNoteId = state.selectedNote;

            const findFolderIndex = state.note_data.findIndex(x => x.id === selectedFolderId);

            const findNoteIndex = state.note_data[findFolderIndex].content.findIndex(x => x.id === selectedNoteId);

            state.note_data[findFolderIndex].content.splice(findNoteIndex, 1);
            state.selectedNote = -1;
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
