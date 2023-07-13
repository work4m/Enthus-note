import ICON from "./../assets/bg_logo.png";
import Button from "./Button";

interface Props {
    title: string,
    description: string
    visible: boolean,
    onCancel?: () => void,
    onSubmit?: () => void
}

const FullPageModal = (props: Props) => {

    if (!props.visible) return null;

    return (
        <div className="full-screen-modal">
            <div className="full-screen-modal-container">
                {/* top title portion */}
                <div className="full-screen-title-container">
                    {/* icon image */}
                    <img className="full-screen-modal-icon" src={ICON} alt="icon" />

                    {/* top right portion */}
                    <div>
                        <h3>{props.title}</h3>

                        <p>{props.description}</p>
                    </div>
                </div>

                {/* button bottom portion */}
                <div className="full-screen-button-container">
                    <Button title="Cancel" onClick={props?.onCancel} />

                    <div className="vertical-bar-between-button" />

                    <Button title="Delete Folder" bold onClick={props?.onSubmit} />
                </div>
            </div>
        </div>
    )
}

export default FullPageModal;