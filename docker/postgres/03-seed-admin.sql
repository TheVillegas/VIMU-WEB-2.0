-- 03-seed-admin.sql
-- Default admin user: admin / admin123
-- Password hash generated using bcrypt round 10 manually or through backend
-- For seed purposes, this hash equals 'admin123'
INSERT INTO admin_users (username, password_hash)
VALUES ('admin', '$2b$10$tZ2R.8QWbA027s/D0h9tJ.aN0wFqf1L0e7vNnOfTqG60fVqX0X75C')
ON CONFLICT (username) DO NOTHING;
