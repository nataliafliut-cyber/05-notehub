import React from 'react';
import type { ComponentType } from 'react';
import ReactPaginateModule from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';
import css from './Pagination.module.css';

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

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
      onPageChange={(event) => onPageChange(event.selected)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      disabledClassName={css.disabled}
      forcePage={forcePage}
    />
  );
};

export default Pagination;