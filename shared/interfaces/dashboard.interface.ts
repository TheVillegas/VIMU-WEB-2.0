import { QuoteStatus } from '../enums';

export interface DashboardStats {
    totalQuotes: number;
    quotesByStatus: Record<QuoteStatus, number>;
    recentQuotes: any[];
}
