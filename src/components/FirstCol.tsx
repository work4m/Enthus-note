import { useNoteStore } from "../store/Notes";

function FirstCol() {

    const { note_data } = useNoteStore();

    const column_item = ({ categoryName, index }: {
        categoryName: string, index: string
    }) => {
        return (
            <li key={index} className="first-col-item-container">
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
                    note_data?.map((category, index) => column_item({ categoryName: category.name, index: `${index}_cat_` }))
                }
            </ul>
        </div>
    )
}

export default FirstCol;
