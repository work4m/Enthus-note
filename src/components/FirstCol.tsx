import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconFolderPlus } from '@tabler/icons-react';

import { RootState } from "../store/Store";
import { SELECT_CATEGORY, ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from "../store/Note/NoteTypes";
import AddFolderItem from "./AddFolderItem";
import PreLiIcon from "./PreLiIcon";
import FullPageModal from "./FullPageModal";

function FirstCol() {

    const dispatch = useDispatch();

    const { note_data, selectedCategory } = useSelector((state: RootState) => state.notes);

    // status for is add folder component show
    const [isAddNewFolder, setAddNewFolder] = useState<boolean>(false);
    // status for editing on/off flag
    const [isEditingStatusOn, setisEditingStatusOn] = useState<boolean>(false);
    // state for selected index for delete
    const [selectedDeletedIndex, setselectedDeletedIndex] = useState<number>(-1);
    // state for selected index for delete
    const [selectedEditIndex, setselectedEditIndex] = useState<number>(-1);

    // add new folder press
    const addFolderPress = () => {
        setAddNewFolder(true);
    }

    // for select main folder
    const select_category = (index: number) => {
        if (isEditingStatusOn) {
            setselectedEditIndex(index);
            return;
        };

        dispatch({ type: SELECT_CATEGORY, payload: index });
    }

    // press on item for delete folder
    const deleteFolder = (folderIndex: number) => {
        setselectedDeletedIndex(folderIndex);
    }

    // after press enter folder adding time
    const onAddFolderSubmit = (data: string) => {
        // hide add folder modal
        setAddNewFolder(false);

        if (data) {
            dispatch({ type: ADD_CATEGORY, payload: { name: data } });
            dispatch({ type: SELECT_CATEGORY, payload: (note_data.length) });
        }
    }

    // after blur enter folder adding time
    const onBlurEditingFolder = () => {
        compliteEditProcess();
    }

    // after press on edit button
    const onEditFolderPress = () => {
        if (isEditingStatusOn) {
            compliteEditProcess();
        } else {
            setisEditingStatusOn(true);
            dispatch({ type: SELECT_CATEGORY, payload: 0 });
        }
    }

    // desable modal for delete
    const compliteEditProcess = () => {
        setselectedDeletedIndex(-1);
        setselectedEditIndex(-1);
        setisEditingStatusOn(false);
    }

    // edit button visible for important folder
    const isEditableFolders = (): boolean => note_data.length > 1;

    // selected category for delete
    const pressOnDeleteModal = () => {
        dispatch({ type: DELETE_CATEGORY, payload: { categoryIndex: selectedDeletedIndex } });
        compliteEditProcess();
    }

    // on delete cancel button press
    const pressOnCancelModal = () => {
        compliteEditProcess();
    }

    // folder name update
    const onFolderNameUpdate = (folderIndex: number, updatedName: string) => {
        dispatch({ type: UPDATE_CATEGORY, payload: { categoryIndex: folderIndex, updatedName } });
        compliteEditProcess();
    }

    // render items for perticular item
    const column_item = ({ categoryName, index }: {
        categoryName: string, index: number
    }) => {
        const isSelected = () => index === selectedCategory;

        let containerClassList = "first-col-item-container";

        // enable selected styles
        if (isSelected() && !isAddNewFolder) {
            containerClassList += " selected-col"
        }

        // edit selected item
        if (selectedEditIndex === index) {
            return (
                <AddFolderItem
                    onSubmit={(data) => onFolderNameUpdate(index, data)}
                    onBlur={onBlurEditingFolder}
                    initialValue={categoryName}
                />
            )
        }

        return (
            <li
                key={`${index}_cat_`}
                className={containerClassList}
                onClick={() => select_category(index)}
            >
                <PreLiIcon
                    isDelete={isEditingStatusOn}
                    onDeletePress={() => deleteFolder(index)}
                    isFirst={index === 0}
                />

                {categoryName}
            </li>
        );
    }

    return (
        <div
            className='column first-column'
        >
            <ul>
                {/* notes list */}
                {
                    note_data?.map((category, index) => column_item({ categoryName: category.name, index }))
                }

                {/* when add new folder user have to show this add component */}
                {
                    isAddNewFolder
                        ?
                        <AddFolderItem
                            onSubmit={onAddFolderSubmit}
                        />
                        :
                        null
                }
            </ul>

            {/* bottom bar */}
            <div className="bottom-container">
                <p
                    className={"edit-text-button" + (isEditableFolders() ? "" : " edit-text-button-disable")}
                    onClick={onEditFolderPress}
                >
                    {isEditingStatusOn ? "Done" : "Edit"}
                </p>

                <div className="add-item-icon" onClick={addFolderPress} title="Add Folder">
                    <IconFolderPlus size={28} />
                </div>
            </div>

            <FullPageModal
                title={`Are you sure you want to delete “${note_data[selectedDeletedIndex]?.name}”?`}
                description={"All notes and any subfolders will be deleted."}
                visible={selectedDeletedIndex > -1}
                onCancel={pressOnCancelModal}
                onSubmit={pressOnDeleteModal}
            />
        </div>
    )
}

export default FirstCol;
