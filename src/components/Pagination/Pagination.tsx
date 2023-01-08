import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { setPageCount } from "../../redux/slices/filterSlice";
import { RootState } from "../../redux/store";
import { FC } from "react";

const Pagination: FC = () => {
  const { countBroom } = useSelector((state: RootState) => state.broom);
  const dispatch = useDispatch();

  const setCurrentPage = (event: number) => {
    dispatch(setPageCount(event));
  };

  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel="&#129046;"
        onPageChange={(e) => setCurrentPage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(countBroom / 8)}
        previousLabel="&#129044;"
        renderOnZeroPageCount={() => null}
      />
    </div>
  );
};

export default Pagination;
