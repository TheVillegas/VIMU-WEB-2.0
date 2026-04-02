import { ProjectType, Timeline, BudgetTier, Priority, QuoteStatus } from '../enums';

export interface QuoteSubmissionInput {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    project_type: ProjectType;
    timeline: Timeline;
    budget_tier: BudgetTier;
    description: string;
}

export interface QuoteRecord {
    id: string;
    company_name: string;
    email: string;
    whatsapp: string | null;
    project_type: ProjectType;
    timeline: Timeline;
    budget_tier: BudgetTier;
    budget_amount: number | null;
    priority: Priority;
    expected_metrics: string | null;
    business_needs: string | null;
    status: QuoteStatus;
    notes: string | null;
    created_at: string;
    updated_at: string;
}
