import { useDispatch, useSelector } from "react-redux";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import BroomItem from "../components/BroomItem";
import { useEffect } from "react";
import Pagination from "../components/Pagination/Pagination";
import { fetchBroom } from "../redux/slices/broomSlice";
import PageNotFound from "./PageNotFound";

function Home() {
  const { categoryId, sortType, pageCount, searchValue, sortOrder } =
    useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.broom);
  const dispatch = useDispatch();

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

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getBrooms();
  }, [categoryId, sortType, sortOrder, searchValue, pageCount]);

  const skeleton = [...new Array(4)].map((_, i) => <Skeleton key={i} />);
  const broom = items.map((obj) => <BroomItem {...obj} key={obj.id} />);

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
            {status === "loading" ? skeleton : broom}
          </ul>
        )}
      </div>
      <Pagination />
    </div>
  );
}

export default Home;
