import { useDispatch, useSelector } from "react-redux";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import BroomItem from "../components/BroomItem";
import { FC, useEffect } from "react";
import Pagination from "../components/Pagination/Pagination";
import { fetchBroom } from "../redux/slices/broomSlice";
import PageNotFound from "./PageNotFound";
import NotFoundBlock from "../components/NotFoundBlock/NotFoundBlock";
import { AppDispatch, RootState } from "../redux/store";

const Home: FC = () => {
  const { categoryId, sortType, pageCount, searchValue, sortOrder } =
    useSelector((state: RootState) => state.filter);
  const { items, status } = useSelector((state: RootState) => state.broom);
  const dispatch: AppDispatch = useDispatch();

  const getBrooms = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const order = sortOrder === false ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchBroom({
        pageCount,
        category,
        sortType,
        order,
        search,
      })
    );
  };

  useEffect(() => {
    getBrooms();
  }, [categoryId, sortType, sortOrder, searchValue, pageCount]);

  const skeleton = [...new Array(4)].map((_, i) => <Skeleton key={i} />);
  const broom = items
    .filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((obj) => <BroomItem {...obj} key={obj.id} />);
  const searchEmpty = !broom.length ? (
    <>
      <NotFoundBlock text={"Мётлы не найдены!"} />
    </>
  ) : (
    ""
  );

  return (
    <div className="broom__content">
      <div>
        <div className="selects-wrapper">
          <Categories />
          <Sort />
        </div>
        {status === "error" ? (
          <PageNotFound />
        ) : (
          <ul className="broom__list">
            {status === "loading" ? skeleton : searchEmpty || broom}
          </ul>
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
