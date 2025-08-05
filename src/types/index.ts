// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
}

// Dashboard metrics
export interface DashboardMetrics {
  revenue: {
    current: number;
    previous: number;
    change: number;
  };
  users: {
    current: number;
    previous: number;
    change: number;
  };
  conversions: {
    current: number;
    previous: number;
    change: number;
  };
  growth: {
    current: number;
    previous: number;
    change: number;
  };
}

// Chart data types
export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
}

export interface LineChartData {
  data: ChartDataPoint[];
  title: string;
  color: string;
}

// Table data types
export interface TableUser {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  role: string;
  joinDate: string;
  lastActive: string;
}

// Theme types
export type Theme = 'light' | 'dark';

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface TableUser {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  role: string;
  joinDate: string;
  lastActive: string;
  company?: string;
  department?: string;
  salary?: number;
  performance?: number;
  projects?: number;
  avatar?: string;
}

export interface CampaignData {
  id: string;
  name: string;
  channel: string;
  status: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  startDate: string;
  endDate: string;
}

export interface TableColumn {
  id: string;
  label: string;
  accessor: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
  align?: 'left' | 'center' | 'right';
}

export interface TableFilter {
  column: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'between';
  value: any;
}
