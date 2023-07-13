import { IconTrash } from "@tabler/icons-react"

type Props = {
    onDeletePress?: () => void;
}

const MainColHeader = (props: Props) => {
  return (
    <div className="main-col-header">
        <IconTrash
            className="main-col-header-delete-icon"
            onClick={props?.onDeletePress}
        />
    </div>
  )
}

export default MainColHeader