import { useSelector } from "react-redux";

import { RootState } from "../store/Store";
import EmptyData from "./EmptyData";

function MainCol() {
    const notes = useSelector((state: RootState) => state.notes);

    const { selectedCategory, selectedNote, note_data } = notes;

    return (
        <div
            className='column main-column'
        >
            {
                (selectedCategory == null || selectedNote == null)
                    ?
                    <EmptyData />
                    :
                    <textarea className="main-col-textarea" placeholder="Enter text here">
                        {note_data[selectedCategory]?.content[selectedNote]?.description}
                    </textarea>
            }
        </div>
    )
}

export default MainCol;
