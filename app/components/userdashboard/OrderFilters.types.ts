export interface OrderFiltersProps {
  searchPlaceholder: string;
  filterOptions: Record<string, string>;
  filter: string;
  search: string;
  isRTL: boolean;
  onSearchChange: (value: string) => void;
  onFilterChange: (key: string) => void;
  disabled: boolean;
}
