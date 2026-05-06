export interface OrderInsightsProps {
  insights: {
    label: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
  }[];
  isRTL: boolean;
}