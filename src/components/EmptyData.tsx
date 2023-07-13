import { memo } from 'react'

import BG_LOGO from "./../assets/bg_logo.png";

interface EmptyDataProps {
  showEmptyText?: boolean,
  onlyText?: boolean
}

function EmptyData(props: EmptyDataProps) {
  return (
    <div className="main-col-bg-logo-container">
      <div>
        {
          !props?.onlyText && <img src={BG_LOGO} className="main-col-bg-logo" />
        }

        {
          props.showEmptyText && <p>No Data</p>
        }
      </div>
    </div>
  )
}

export default memo(EmptyData);