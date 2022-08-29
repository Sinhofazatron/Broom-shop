import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { setPageCount } from "../../redux/slices/filterSlice";

function Pagination() {
  const { countBroom } = useSelector((state) => state.broom);
  const dispatch = useDispatch();

  const setCurrentPage = (event) => {
    dispatch(setPageCount(event));
  };

  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => setCurrentPage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(countBroom / 8)}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default Pagination;
