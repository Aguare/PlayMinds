-- Create user
CREATE USER IF NOT EXISTS 'admin_pm'@'localhost' IDENTIFIED BY 'play_mind123!';

-- adding permissions and privileges
GRANT ALL PRIVILEGES ON bd_playmind.* TO 'admin_pm'@'localhost';

FLUSH PRIVILEGES;