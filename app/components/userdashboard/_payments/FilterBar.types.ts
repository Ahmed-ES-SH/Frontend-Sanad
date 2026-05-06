import { FilterStatus } from "./TransactionTable.types";

export interface FilterBarProps {
  searchQuery: string;
  statusFilter: FilterStatus;
  dateFrom: string;
  dateTo: string;
  activeFilterCount: number;
  hasActiveFilters: boolean;
  onSearchChange: (query: string) => void;
  onStatusFilterChange: (status: FilterStatus) => void;
  onDateFromChange: (date: string) => void;
  onDateToChange: (date: string) => void;
  onClearFilters: () => void;
}

export interface StatusOption {
  value: FilterStatus;
  label: string;
}