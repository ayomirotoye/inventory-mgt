import { isNullOrUndefined } from "../../libs/helper";
import { DOTS, usePagination } from "./usePagination";

const Pagination = (props: {
  onPageChange: any;
  totalCount: any;
  siblingCount?: 1 | undefined;
  currentPage: any;
  pageSize: any;
}) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (
    currentPage === 0 ||
    isNullOrUndefined(paginationRange) ||
    paginationRange!.length < 2
  ) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange![paginationRange!.length - 1];

  return (
    <div>
      <div>
        <ul className="pagination list-none font-bold flex space-x-2 justify-start text-sm">
          <li
            key={"pagination_previous"}
            style={{ backgroundColor: "transparent" }}
          >
            <button
              onClick={onPrevious}
              disabled={currentPage === 1}
              className={`font-bold border-0 ${
                currentPage === 1 ? "text-gray-400" : "cursor-pointer"
              }`}
            >
              &lsaquo; Previous
            </button>
          </li>

          {paginationRange!.map((pageNumber) => {
            if (pageNumber === DOTS) {
              return (
                <li key={"pagination_dot"} className="text-color-9 rounded-lg">
                  &#8230;
                </li>
              );
            }

            return (
              <li
                key={"pagination_".concat(pageNumber)}
                className={
                  pageNumber === currentPage
                    ? "text-color-9 rounded-lg active bg-primary-400 p-3"
                    : "text-color-9 rounded-lg cursor-pointer"
                }
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </li>
            );
          })}

          <li
            key={"pagination_next"}
            style={{ backgroundColor: "transparent" }}
          >
            <button
              className={`font-bold border-0 ${
                currentPage === lastPage ? "text-gray-400" : "cursor-pointer"
              }`}
              onClick={onNext}
              disabled={currentPage === lastPage}
            >
              Next &rsaquo;
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
