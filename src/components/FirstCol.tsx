import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store/Store";
import { SELECT_CATEGORY } from "../store/Note/NoteTypes";

function FirstCol() {

    const dispatch = useDispatch();

    const { note_data, selectedCategory } = useSelector((state: RootState) => state.notes);

    const select_category = (index: number) => {
        dispatch({ type: SELECT_CATEGORY, payload: index });
    }

    const column_item = ({ categoryName, index }: {
        categoryName: string, index: number
    }) => {
        const isSelected = () => index === selectedCategory;

        let containerClassList = "first-col-item-container";

        if (isSelected()) {
            containerClassList += " selected-col"
        }

        return (
            <li key={`${index}_cat_`} className={containerClassList} onClick={() => select_category(index)}>
                {categoryName}
            </li>
        );
    }

    return (
        <div
            className='column first-column'
        >
            <ul>
                {
                    note_data?.map((category, index) => column_item({ categoryName: category.name, index }))
                }
            </ul>
        </div>
    )
}

export default FirstCol;
