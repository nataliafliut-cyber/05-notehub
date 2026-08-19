import React from 'react';
import ReactPaginateModule from 'react-paginate';
import css from './Pagination.module.css';

// Bezpieczne wyciągnięcie komponentu w zależności od typu modułu (ESM/CJS)
const ReactPaginate = (
  'default' in ReactPaginateModule
    ? ReactPaginateModule.default
    : ReactPaginateModule
) as unknown as React.ComponentType<any>;

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
  forcePage: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  forcePage,
}) => {
  return (
    <ReactPaginate
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={(event: { selected: number }) => onPageChange(event.selected)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      disabledClassName={css.disabled}
      forcePage={forcePage}
    />
  );
};

export default Pagination;