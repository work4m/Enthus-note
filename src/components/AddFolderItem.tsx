import { ChangeEvent, FormEvent, useState } from "react";

import PreLiIcon from "./PreLiIcon";

type Props = {
    onSubmit: (data: string) => void;
    onBlur?: () => void;
    initialValue?: string
}

const AddFolderItem = (props: Props) => {

    const [folderTitle, setfolderTitle] = useState(props?.initialValue || "");

    // on enter/submit form
    const onSubmitName = (e: FormEvent) => {
        e.preventDefault();

        props.onSubmit(folderTitle.trim());
    }

    // on blur form
    const onFiledBlur = () => {
        if (props.onBlur) {
            props.onBlur();
        }
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
                    onBlur={onFiledBlur}
                    value={folderTitle}
                    autoFocus
                />
            </form>
        </li>
    )
}

export default AddFolderItem;
