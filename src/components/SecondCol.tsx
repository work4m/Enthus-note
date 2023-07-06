import { useDispatch, useSelector } from "react-redux";
import { IconEdit } from "@tabler/icons-react";

import { RootState } from "../store/Store";
import { SELECT_NOTE } from "../store/Note/NoteTypes";
import EmptyData from "./EmptyData";
import SearchNoteBar from "./SearchNoteBar";

function SecondCol() {

    const dispatch = useDispatch();

    const { note_data, selectedNote, selectedCategory = 0 } = useSelector((state: RootState) => state.notes);

    // select note
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
                <p>{note.description.slice(0, 5)}...</p>
                <p>{`${date.getDate()} - ${(date.getMonth() + 1)}`}</p>
            </li>
        );
    }

    // press on create note
    const createNotePress = () => {

    }

    return (
        <div
            className='column second-column'
        >
            {/* top bar */}
            <div className="top-container">
                <SearchNoteBar />

                <div className="add-item-icon add-note-icon" onClick={createNotePress}>
                    <IconEdit size={"20px"} stroke={"1px"} />
                </div>
            </div>

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
