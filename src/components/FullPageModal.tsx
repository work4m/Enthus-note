import ICON from "./../assets/bg_logo.png";

interface Props {
    title: string,
    description: string
    visible: boolean
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
                    <button>Cancel</button>

                    <button>{"button"}</button>
                </div>
            </div>
        </div>
    )
}

export default FullPageModal;