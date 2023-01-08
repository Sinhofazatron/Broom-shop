import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import React, { FC, useCallback, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setPageCount, setSearchValue } from "../../redux/slices/filterSlice";
import { RootState } from "../../redux/store";

const Search: FC = () => {
  const [value, setValue] = useState("");
  const searchValue = useSelector(
    (state: RootState) => state.filter.searchValue
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPageCount(1));
    updateSearchValue(event.target.value);
    setValue(event.target.value);
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 700),
    []
  );

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <form className={styles.form}>
        <input
          ref={inputRef}
          onChange={onChangeSearch}
          value={value}
          className={styles.search}
          placeholder="Поиск по метлам..."
          type="text"
        />{" "}
        {searchValue && (
          <svg
            onClick={onClickClear}
            className={styles.img}
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        )}
      </form>
    </div>
  );
};

export default Search;
