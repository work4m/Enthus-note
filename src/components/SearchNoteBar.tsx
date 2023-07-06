import { IconSearch } from "@tabler/icons-react"

type Props = {}

const SearchNoteBar = (props: Props) => {
  return (
    <div className="search-container">
        <IconSearch  size={"20px"} stroke={"1px"} />

        <input type="text" className="search-inputbox" />
    </div>
  )
}

export default SearchNoteBar