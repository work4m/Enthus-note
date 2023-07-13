import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconEdit } from "@tabler/icons-react";

import { RootState } from "../store/Store";
import { SELECT_NOTE } from "../store/Note/NoteTypes";
import EmptyData from "./EmptyData";
import SearchNoteBar from "./SearchNoteBar";

function SecondCol() {

    const dispatch = useDispatch();

    const { note_data, selectedNote, selectedCategory = 0 } = useSelector((state: RootState) => state.notes);

    const allContents = note_data[selectedCategory].content;

    // search text
    const [filterNoteText, setfilterNoteText] = useState<string>("");

    // select note
    const select_note = (index: number) => {
        dispatch({ type: SELECT_NOTE, payload: index });
    }

    // note list data
    // TODO this will use after structure update
    // const note_list_data = useMemo((): Content[] => {
    //     return allContents;
    // }, [note_data, filterNoteText]);

    // is notes available functions
    const __notesAvailable = useCallback(() => {
        return (selectedCategory != -1 && allContents.length > 0);
    }, [note_data, selectedCategory]);

    // render items components
    const __renderNotes = (note: Content, index: number) => {

        const date = new Date(note.modifyDate);

        const isSelected = () => index === selectedNote;

        let containerClassList = "second-col-item-container";

        if (isSelected()) {
            containerClassList += " selected-col"
        }

        // ! will delete this function after update redux store structure
        // ! because it is not proper way
        if (filterNoteText.trim().length > 0 && note.description.indexOf(filterNoteText) === -1) return null;

        console.log("data :: ", note.description.indexOf(filterNoteText), filterNoteText.length);

        return (
            <li key={`${index}_note_`} className={containerClassList} onClick={() => select_note(index)}>
                <p>{note.description.slice(0, 5)}...</p>
                <p>{`${date.getDate()} - ${(date.getMonth() + 1)}`}</p>
            </li>
        );
    }

    // press on create note
    const createNotePress = () => {
        dispatch({ type: "ADD_NOTE" });
        dispatch({ type: SELECT_NOTE, payload: allContents.length });
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
                {/* <SearchNoteBar
                    searchText={(data) => onSearchInputChange(data)}
                /> */}

                <div className="add-item-icon add-note-icon" onClick={createNotePress} title="Add Note">
                    <IconEdit size={"20px"} stroke={"1px"} />
                </div>
            </div>

            {
                __notesAvailable()
                    ?
                    <ul>
                        {allContents.map(__renderNotes)}
                    </ul>
                    :

                    <EmptyData showEmptyText onlyText />
            }
        </div>
    )
}

export default SecondCol;
