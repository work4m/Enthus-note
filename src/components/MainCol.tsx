import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from 'use-debounce';

import { RootState } from "../store/Store";
import EmptyData from "./EmptyData";
import { UPDATE_CATEGORY } from "../store/Note/NoteTypes";

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
            type: UPDATE_CATEGORY,
            payload
        });
    }, DEFAULT_SAVE_TIME);

    return (
        <div
            className='column main-column'
        >
            {
                (selectedCategory == null || selectedNote == null)
                    ?
                    <EmptyData />
                    :
                    <textarea
                        className="main-col-textarea"
                        placeholder="Enter text here"
                        defaultValue={note_data[selectedCategory]?.content[selectedNote]?.description}
                        onChange={x => debouncedValue(x.target.value)}
                    >
                    </textarea>
            }
        </div>
    )
}

export default MainCol;
