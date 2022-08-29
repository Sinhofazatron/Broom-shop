import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

const categories = [
  "Все",
  "Для начинающих",
  "Для любителей",
  "Для опытных",
  "Для профессионалов",
];

function Categories() {
  const dispatch = useDispatch();
  const { categoryId } = useSelector((state) => state.filter);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  return (
    <div className="selects-wrapper__type-list">
      <label className="selects-wrapper__type-list-text" htmlFor="type-select">
        Тип:
      </label>
      <select
        value={categoryId}
        onChange={(e) => onChangeCategory(e.target.value)}
        id="type-select"
      >
        {categories.map((value, index) => (
          <option
            className="selects-wrapper__type-item"
            key={index}
            value={index}
          >
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Categories;
