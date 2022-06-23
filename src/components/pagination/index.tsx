import { isNullOrUndefined } from '../../libs/helper';
import { usePagination, DOTS } from './usePagination';

const Pagination = (props: { onPageChange: any; totalCount: any; siblingCount?: 1 | undefined; currentPage: any; pageSize: any }) => {

  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

  const paginationRange = usePagination({ currentPage, totalCount, siblingCount, pageSize });

  if (currentPage === 0 || isNullOrUndefined(paginationRange) || paginationRange!.length < 2) {
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
        <ul className='pagination list-none font-bold flex space-x-2 justify-start cursor-pointer text-sm'>
          <li key={"pagination_previous"} style={{ backgroundColor: 'transparent' }}>
            <button onClick={onPrevious} disabled={currentPage === 1} className="font-bold border-0 cursor-pointer" style={{ backgroundColor: 'transparent' }}>&lsaquo; Previous</button>
          </li>

          {paginationRange!.map(pageNumber => {
            if (pageNumber === DOTS) {
              return <li key={"pagination_dot"} className="text-color-9 rounded-lg">&#8230;</li>;
            }

            return (
              <li key={"pagination_".concat(pageNumber)} className={pageNumber === currentPage ? 'text-color-9 rounded-lg active' : 'text-color-9 rounded-lg'} onClick={() => onPageChange(pageNumber)}>
                {pageNumber}
              </li>
            );
          })}

          <li key={"pagination_next"} style={{ backgroundColor: 'transparent' }}>
            <button className="border-0 cursor-pointer font-bold" onClick={onNext} disabled={currentPage === lastPage} style={{ backgroundColor: 'transparent' }}>Next &rsaquo;</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
