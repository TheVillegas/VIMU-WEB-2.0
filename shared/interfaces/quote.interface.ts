import { ProjectType, Timeline, BudgetTier, Priority, QuoteStatus } from '../enums';

export interface Quote {
    id?: string;
    company_name: string;
    email: string;
    whatsapp?: string;
    project_type: ProjectType;
    timeline: Timeline;
    budget_tier: BudgetTier;
    budget_amount?: number;
    priority: Priority;
    expected_metrics?: string;
    business_needs?: string;
    status?: QuoteStatus;
    notes?: string;
    created_at?: Date;
    updated_at?: Date;
}
