import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconEdit } from "@tabler/icons-react";

import { RootState } from "../store/Store";
import { ADD_NOTE, SELECT_NOTE } from "../store/Note/NoteTypes";
import EmptyData from "./EmptyData";
import SearchNoteBar from "./SearchNoteBar";

function SecondCol() {

    const dispatch = useDispatch();

    const { note_data, selectedNote, selectedCategory = 0, latestNewNoteNumber } = useSelector((state: RootState) => state.notes);

    const allContents = note_data[selectedCategory]?.content || [];

    // search text
    const [filterNoteText, setfilterNoteText] = useState<string>("");

    // select note
    const select_note = (noteId: number) => {
        dispatch({ type: SELECT_NOTE, payload: noteId });
    }

    // note list data
    const note_list_data = useMemo<Content[]>(() => {
        return allContents.filter(x => x.description.indexOf(filterNoteText) > -1);
    }, [allContents, filterNoteText]);

    // is notes available functions
    const __notesAvailable = useCallback(() => {
        return (selectedCategory != -1 && note_list_data.length > 0);
    }, [note_data, selectedCategory]);

    // render items components
    const __renderNotes = (note: Content, index: number) => {

        const date = new Date(note.modifyDate);

        const isSelected = () => note.id === selectedNote;

        let containerClassList = "second-col-item-container";

        if (isSelected()) {
            containerClassList += " selected-col"
        }

        return (
            <li key={`${index}_note_`} className={containerClassList} onClick={() => select_note(note.id)}>
                <p>{note.description.slice(0, 5)}...</p>
                <p>{`${date.getDate()} - ${(date.getMonth() + 1)}`}</p>
            </li>
        );
    }

    // press on create note
    const createNotePress = () => {
        dispatch({ type: ADD_NOTE });
        // dispatch({ type: SELECT_NOTE, payload: (latestNewNoteNumber + 1) });
    }

    // event on search box type
    const onSearchInputChange = (data: string) => {
        setfilterNoteText(data);
    }

    return (
        <div
            className='column second-column'
        >
            {/* top bar */}
            <div className="top-container">
                <SearchNoteBar
                    searchText={(data) => onSearchInputChange(data)}
                />

                <div className="add-item-icon add-note-icon" onClick={createNotePress} title="Add Note">
                    <IconEdit size={"20px"} stroke={"1px"} />
                </div>
            </div>

            {
                __notesAvailable()
                    ?
                    <ul>
                        {note_list_data.map(__renderNotes)}
                    </ul>
                    :

                    <EmptyData showEmptyText onlyText />
            }
        </div>
    )
}

export default SecondCol;
