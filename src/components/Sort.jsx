import { useDispatch, useSelector } from "react-redux";
import { setSort, setSortOrder } from "../redux/slices/filterSlice";

const sortList = [
  { name: "По актуальности", sortProperty: "id" },
  { name: "По популярности", sortProperty: "rating" },
  { name: "По цене", sortProperty: "price" },
  { name: "По алфавиту", sortProperty: "title" },
];

function Sort() {
  const { sortType, sortOrder } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const onChangeSort = (id) => {
    dispatch(setSort(id));
  };

  return (
    <div className="selects-wrapper__sort-list">
      <label className="selects-wrapper__sort-list-text" htmlFor="sort-select">
        Сортировать по:
      </label>
      <select
        value={sortType}
        onChange={(e) => onChangeSort(e.target.value)}
        id="sort-select"
      >
        {sortList.map((value, index) => (
          <option
            className="selects-wrapper__sort-item"
            value={value.sortProperty}
            key={index}
          >
            {value.name}
          </option>
        ))}
      </select>
      <img
        onClick={() => dispatch(setSortOrder(!sortOrder))}
        className={
          sortOrder
            ? "selects-wrapper__sort-item-arrow--active"
            : "selects-wrapper__sort-item-arrow"
        }
        src={require("../assets/img/arrow-down.png")}
        alt="arrow-down"
      />
    </div>
  );
}

export default Sort;
