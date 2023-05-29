import { create } from 'zustand';

// store setup
type Store = {
    note_data: NoteData[];
}

export const useNoteStore = create<Store>((set) => ({
    note_data: [],
}));
