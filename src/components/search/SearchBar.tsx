import styles from "./Search.module.css";
import SearchIcon from "../../assets/search.png";
import { type SetStateAction } from "react";


interface Props {
    searchVal:string;
    setSearchVal: React.Dispatch<SetStateAction<string>>;
}
const SearchBar = (props:Props) => {
    const {searchVal,setSearchVal} = props||{};

  return (
    <div className={styles.container}>
      <img src={SearchIcon} alt="SearchIcon" />
      <input
        type="text"
        placeholder="Search"
        value={searchVal}
        onChange={(e)=>setSearchVal(e.target.value)}
      />
     
    </div>
  );
};

export default SearchBar;
