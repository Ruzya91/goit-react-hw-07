import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filtersSlice";
import { selectNameFilter } from "../../redux/selectors";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  return (
    <div className={styles.search}>
      <p>Find contacts by name</p>
      <input
        type="text"
        className={styles.input}
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />
    </div>
  );
};

export default SearchBox;
