import { ChangeEvent, FormEvent, useState } from "react";

import PreLiIcon from "./PreLiIcon";

type Props = {
    onSubmit: (data: string) => void;
}

const AddFolderItem = (props: Props) => {

    const [folderTitle, setfolderTitle] = useState("");

    // on enter/submit form
    const onSubmitName = (e: FormEvent) => {
        e.preventDefault();

        props.onSubmit(folderTitle.trim());
    }

    // on input change text
    const onInputChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setfolderTitle(e.target.value);
    }

    return (
        <li className="first-col-item-container selected-col">
            <PreLiIcon />

            <form onSubmit={onSubmitName}>
                <input
                    type="text"
                    className="add-folder-inputbox"
                    onChange={onInputChangeName}
                    autoFocus
                />
            </form>
        </li>
    )
}

export default AddFolderItem;
