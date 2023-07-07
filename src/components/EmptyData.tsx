import { memo } from 'react'

import BG_LOGO from "./../assets/bg_logo.png";

function EmptyData() {
  return (
    <div className="main-col-bg-logo-container">
        <img src={BG_LOGO} className="main-col-bg-logo" />
    </div>
  )
}

export default memo(EmptyData);