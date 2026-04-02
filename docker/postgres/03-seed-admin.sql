-- 03-seed-admin.sql
-- Default admin user: admin@vimudevs.com / admin123
-- Password hash generated using bcrypt round 10 manually or through backend
INSERT INTO admin_users (email, password_hash)
VALUES ('admin@vimudevs.com', '$2b$10$.Cu.S/ixD6ZxlqEMm4PHhu6W1TwrWd/jJ8uRuORMMqLtFxnu0oDmu')
ON CONFLICT (email) DO NOTHING;
