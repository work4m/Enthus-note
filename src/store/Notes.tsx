import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

// store setup
export type Store = {
    note_data: Category[];
    addNote?: (categoryIndex: number, note: Partial<Content>) => void;
    updateNote?: (categoryIndex: number, noteIndex: number, note: Partial<Content>) => void;
    deleteNote?: (categoryIndex: number, noteIndex: number) => void;
}

export const useNoteStore = create<Store>()(
    // devtools(
    //     persist(
    (set) => ({
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
            }
        ],

        // add note
        addNote: (categoryIndex: number, note: Partial<Content>) => {
            const { title = "", description = "" } = note;
            set((state: Store) => {
                state.note_data[categoryIndex].content.push({
                    title,
                    description,
                    modifyDate: new Date().toString(),
                });
                return { ...state }; // Return the updated state object
            });
        },

        // update note
        updateNote: (categoryIndex: number, noteIndex: number, note: Partial<Content>) => {
            const { title = "", description = "" } = note;
            set((state: Store) => {
                state.note_data[categoryIndex].content[noteIndex] = {
                    title,
                    description,
                    modifyDate: new Date().toString(),
                };
                return { ...state }; // Return the updated state object
            });
        },

        // delete note
        deleteNote: (categoryIndex: number, noteIndex: number) => {
            set((state: Store) => {
                state.note_data[categoryIndex].content.splice(noteIndex, 1);
                return { ...state }; // Return the updated state object
            });
        },

    }
    )
    //         ,
    //         {
    //             name: 'note-main-storage',
    //         }
    //     )
    // )
);