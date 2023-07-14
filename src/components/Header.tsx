import LOGO from './../assets/bg_logo.png';

function Header() {
    return (
        <div className="header-container">
            {/* logo */}
            <img src={LOGO} alt="logo" />

            {/* title */}
            <p>
                Enthus <span className="note-text">Notes</span>
            </p>
        </div>
    )
}

export default Header