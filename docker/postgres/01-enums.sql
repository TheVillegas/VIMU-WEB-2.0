-- 01-enums.sql
CREATE TYPE project_type_enum AS ENUM ('E-commerce', 'Blog', 'Landing', 'ERP', 'Mobile App', 'Hosting', 'AI', 'Audit');
CREATE TYPE timeline_enum AS ENUM ('Short', 'Medium', 'Long', 'Flexible');
CREATE TYPE budget_tier_enum AS ENUM ('Basic', 'Intermediate', 'Large');
CREATE TYPE priority_enum AS ENUM ('Low', 'Normal', 'Urgent');
CREATE TYPE quote_status_enum AS ENUM ('PENDING', 'CONTACTED', 'IN_PROGRESS', 'REJECTED', 'COMPLETED');
