-- 01-enums.sql
CREATE TYPE project_type_enum AS ENUM ('consultoria', 'full_stack', 'modernizacion', 'cloud_serverless', 'ia_agentes');
CREATE TYPE timeline_enum AS ENUM ('urgente', 'corto', 'medio', 'largo', 'flexible');
CREATE TYPE budget_tier_enum AS ENUM ('bajo', 'medio', 'alto', 'a_consultar');
CREATE TYPE priority_enum AS ENUM ('Low', 'Normal', 'Urgent');
CREATE TYPE quote_status_enum AS ENUM ('nuevo', 'visto', 'respondido', 'cerrado');
