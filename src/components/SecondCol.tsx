import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store/Store";
import { SELECT_NOTE } from "../store/Note/NoteTypes";
import EmptyData from "./EmptyData";

function SecondCol() {

    const dispatch = useDispatch();

    const { note_data, selectedNote, selectedCategory = 0 } = useSelector((state: RootState) => state.notes);

    const select_note = (index: number) => {
        dispatch({ type: SELECT_NOTE, payload: index });
    }

    // is notes available functions
    const __notesAvailable = () => {
        return (selectedCategory != undefined && note_data[selectedCategory].content.length > 0);
    }

    // render items components
    const __renderNotes = (note: Content, index: number) => {

        const date = new Date(note.modifyDate);

        const isSelected = () => index === selectedNote;

        let containerClassList = "second-col-item-container";

        if (isSelected()) {
            containerClassList += " selected-col"
        }

        return (
            <li key={`${index}_note_`} className={containerClassList} onClick={() => select_note(index)}>
                <p>{note.description.slice(0, 4)}</p>
                <p>{`${date.getDate()} - ${(date.getMonth() + 1)}`}</p>
            </li>
        );
    }

    return (
        <div
            className='column second-column'
        >
            {
                __notesAvailable()
                    ?
                    <ul>
                        {note_data[selectedCategory].content.map(__renderNotes)}
                    </ul>
                    :
                    <EmptyData />
            }
        </div>
    )
}

export default SecondCol;
