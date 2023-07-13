import { ChangeEvent } from "react";
import { IconSearch } from "@tabler/icons-react"

type Props = {
  searchText?: (test: string) => void;
}

const SearchNoteBar = (props: Props) => {

  // on change text search bar
  const searchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.searchText) {
      props.searchText(e.target.value);
    }
  }

  return (
    <div className="search-container">
        <IconSearch  size={"20px"} stroke={"1px"} />

        <input type="text" className="search-inputbox" onChange={searchTextChange} />
    </div>
  )
}

export default SearchNoteBar;