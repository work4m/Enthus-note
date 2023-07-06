import { FormEvent } from "react";

type Props = {
    onSubmit: (data: string) => void;
}

const AddFolderItem = (props: Props) => {

    // on enter/submit form
    const onSubmitName = (e: FormEvent) => {
        e.preventDefault();
        console.log("data e :: ", e.target);
        props.onSubmit("data e ::");
    }

    return (
        <li className="first-col-item-container selected-col">
            <form onSubmit={onSubmitName}>
                <input type="text" className="add-folder-inputbox" />
            </form>
        </li>
    )
}

export default AddFolderItem;
