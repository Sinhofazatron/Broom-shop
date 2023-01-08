import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setPageCount } from "../redux/slices/filterSlice";
import { AppDispatch, RootState } from "../redux/store";
import { FC } from "react";

const categories = [
  "Все",
  "Для начинающих",
  "Для любителей",
  "Для опытных",
  "Для профессионалов",
];

const Categories: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { categoryId } = useSelector((state: RootState) => state.filter);

  const onChangeCategory = (id: any) => {
    dispatch(setPageCount(1));
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
};

export default Categories;
