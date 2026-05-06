export interface TransactionPaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  isFetching: boolean;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  filteredCount: number;
  onPageChange: (page: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}