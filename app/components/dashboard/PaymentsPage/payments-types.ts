// ==================== Types ====================

export interface Transaction {
  id: string;
  customer: {
    name: string;
    email: string;
    initials: string;
    color: string;
  };
  amount: string;
  status: "success" | "pending" | "failed";
  date: string;
  method: string;
}

export interface PaymentStatsData {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  iconBg: string;
}

export interface PaymentAction {
  icon: React.ReactNode;
  label: string;
  subtitle: string;
}

// ==================== Payment Detail Types ====================

export interface PaymentLineItem {
  description: string;
  quantity: number;
  price: number;
  currency: string;
}

export interface PaymentDetail {
  id: string;
  status: "success" | "pending" | "failed" | "refunded";
  amount: number;
  currency: string;
  netVolume: number;
  processingFeePercent: number;
  method: {
    type: string;
    last4: string;
    brand: string;
  };
  processedAt: string;
  merchant: {
    name: string;
    location: string;
  };
  billingCycle: {
    plan: string;
    period: string;
  };
  lineItems: PaymentLineItem[];
  customer: {
    name: string;
    email: string;
    location: string;
    avatarUrl: string;
    isKycVerified: boolean;
    clientType: string;
  };
  statusHistory: StatusHistoryEntry[];
  security: {
    riskScore: number;
    riskLevel: string;
    cvvCheck: boolean;
    postCodeCheck: boolean;
    ipAddress: string;
    origin: string;
  };
  auditLogs: AuditLogEntry[];
}

export interface StatusHistoryEntry {
  status: "completed" | "authorized" | "initiated" | "refunded" | "failed";
  title: string;
  description: string;
  time: string;
}

export interface AuditLogEntry {
  timestamp: string;
  level: "INFO" | "DEBUG" | "WARN" | "ERROR";
  message: string;
}
