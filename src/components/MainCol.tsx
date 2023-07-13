import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from 'use-debounce';

import { RootState } from "../store/Store";
import EmptyData from "./EmptyData";
import { DELETE_NOTE, UPDATE_NOTE } from "../store/Note/NoteTypes";
import MainColHeader from "./MainColHeader";

// default note save time in ms
const DEFAULT_SAVE_TIME = 500;

function MainCol() {

    const dispatch = useDispatch();

    const notes = useSelector((state: RootState) => state.notes);

    const { selectedCategory, selectedNote, note_data } = notes;

    // change updateNote
    const debouncedValue = useDebouncedCallback((value: string) => {
        const payload = {
            categoryIndex: selectedCategory,
            noteIndex: selectedNote,
            note: { description: value }
        };

        dispatch({
            type: UPDATE_NOTE,
            payload
        });
    }, DEFAULT_SAVE_TIME);

    // delete button press
    const onPressDeleteNoteItem = () => {
        dispatch({ type: DELETE_NOTE });
    }

    return (
        <div
            className='column main-column'
        >
            {
                (selectedCategory == -1 || selectedNote == -1)
                    ?
                    <EmptyData />
                    :
                    <>
                        {/* header */}
                        <MainColHeader
                            onDeletePress={onPressDeleteNoteItem}
                        />

                        {/* text edit area */}
                        <textarea
                            className="main-col-textarea"
                            placeholder="Enter text here"
                            defaultValue={note_data[selectedCategory]?.content[selectedNote]?.description}
                            onChange={x => debouncedValue(x.target.value)}
                        >
                        </textarea>
                    </>
            }
        </div>
    )
}

export default MainCol;
