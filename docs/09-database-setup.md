# Database Setup Guide — PostgreSQL

This document outlines the setup steps for configuring the Sentinal application with PostgreSQL.

## Prerequisites

1. **PostgreSQL installed** (version 12+)
   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - macOS: `brew install postgresql@15`
   - Linux: `sudo apt-get install postgresql postgresql-contrib`

2. **PostgreSQL running**
   - Start the service (Windows: Services → PostgreSQL, macOS: `brew services start postgresql`, Linux: `sudo service postgresql start`)

3. **PHP with PDO PostgreSQL extension enabled**
   - Windows: Uncomment `extension=pdo_pgsql` in `php.ini`
   - Verify: `php -m | grep pdo_pgsql`

## Local Development Setup

### 1. Create PostgreSQL Database and User

```bash
psql -U postgres

# In the PostgreSQL prompt:
CREATE ROLE sentinal_user WITH LOGIN PASSWORD 'your_secure_password';
CREATE DATABASE sentinal OWNER sentinal_user;
GRANT ALL PRIVILEGES ON DATABASE sentinal TO sentinal_user;
\q
```

### 2. Configure Environment

Copy the `.env.example` to `.env` and update the database credentials:

```bash
cd api
cp .env.example .env
```

Edit `.env`:
```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=sentinal
DB_USERNAME=sentinal_user
DB_PASSWORD=your_secure_password
APP_KEY=base64:YOUR_KEY_HERE
```

Generate an APP_KEY if needed:
```bash
php artisan key:generate
```

### 3. Run Migrations

```bash
php artisan migrate
```

Expected output:
```
Migrating: 2024_01_01_000000_create_users_table
Migrated:  2024_01_01_000000_create_users_table (XX ms)
...
```

### 4. Seed Sample Data

```bash
php artisan db:seed
```

This creates:
- **3 test users** (Alice, Bob, Charlie) with test passwords
- **4 vault entries** across Alice and Bob accounts
- **4 devices** with realistic security scores and trust states
- **5 login events** including successful logins and suspicious attempts
- **4 notifications** for suspicious logins and device updates

### 5. Verify Setup

```bash
# List users and vault entries
psql -U sentinal_user -d sentinal -c "SELECT id, name, email FROM users;"
psql -U sentinal_user -d sentinal -c "SELECT id, user_id, site_name FROM vault_entries;"

# Or use Laravel:
php artisan tinker
>>> User::all();
>>> VaultEntry::count();
```

## Production Deployment

### 1. Prepare PostgreSQL on Production Server

```bash
# On production server
sudo apt-get update && sudo apt-get install postgresql postgresql-contrib

# Create dedicated database user
sudo -u postgres createuser sentinal_prod
sudo -u postgres createdb -O sentinal_prod sentinal_prod

# Set secure password
sudo -u postgres psql
ALTER USER sentinal_prod WITH PASSWORD 'STRONG_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON DATABASE sentinal_prod TO sentinal_prod;
\q
```

### 2. Deploy Application Code

```bash
# On production server
git clone <your-repo> /var/www/sentinal
cd /var/www/sentinal/api
composer install --no-dev --optimize-autoloader
```

### 3. Configure Production Environment

Create `.env` on production:
```
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:YOUR_PRODUCTION_KEY
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=sentinal_prod
DB_USERNAME=sentinal_prod
DB_PASSWORD=STRONG_PASSWORD_HERE

# Use a production cache driver (Redis recommended)
CACHE_STORE=redis
QUEUE_CONNECTION=database
SESSION_DRIVER=database
```

### 4. Run Migrations on Production

```bash
php artisan migrate --force
```

### 5. Seed Initial Admin/Test Data (Optional)

```bash
php artisan db:seed --force
```

**Note:** On production, you may want to create a separate seeder for initial admin setup rather than running the full sample data seeder.

## Database Schema

Migrations are located in `api/database/migrations/`:

- `0001_01_01_000000_create_users_table.php` — User accounts
- `2026_05_25_000001_create_vault_entries_table.php` — Encrypted vault credentials
- `2026_05_25_000002_create_devices_table.php` — Device tracking
- `2026_05_25_000003_create_login_events_table.php` — Login audit trail
- `2026_05_25_000004_create_notifications_table.php` — User notifications
- `2026_05_25_000005_create_audit_logs_table.php` — System audit log

All tables include:
- Foreign key constraints with cascading deletes
- Indexes for common queries (user_id, timestamps, search fields)
- Timestamps (created_at, updated_at) for auditing

## Rollback & Reset

### Reset to Clean State (Development Only)

```bash
# Drop all tables and rerun migrations
php artisan migrate:fresh

# Reseed sample data
php artisan db:seed
```

### Rollback Last Migration

```bash
php artisan migrate:rollback
```

## Troubleshooting

### "could not find driver"
- Ensure `pdo_pgsql` is enabled in PHP: `php -m | grep pdo_pgsql`
- On Windows, uncomment `extension=pdo_pgsql` in `php.ini` and restart PHP service

### "FATAL: Ident authentication failed"
- Edit PostgreSQL config: `sudo nano /etc/postgresql/15/main/pg_hba.conf`
- Change `ident` to `md5` for local connections
- Restart: `sudo service postgresql restart`

### Connection timeout
- Verify PostgreSQL is running: `pg_isready`
- Check DB_HOST and DB_PORT in `.env`
- Ensure firewall allows port 5432 (production)

### Migrations fail with "relation does not exist"
- Ensure you ran migrations before seeding: `php artisan migrate`
- Check migration order (timestamps matter)

## Test Database Setup

For running tests with PHPUnit:

```bash
# Create test database
createdb sentinal_test -U sentinal_user

# Edit .env.testing with PostgreSQL credentials
DB_CONNECTION=pgsql
DB_DATABASE=sentinal_test
DB_USERNAME=sentinal_user
DB_PASSWORD=...

# Run tests (migrations run automatically on test DB)
php artisan test
```

## Next Steps

After setup is complete:
1. Start the development server: `php artisan serve`
2. Navigate to `http://localhost:8000/api/v1/health` to verify the API is running
3. Test authentication: POST to `/api/v1/auth/register` with sample credentials
4. Use the seeded test users to verify vault, device, and login event endpoints

For detailed API endpoint documentation, see [docs/04-api-contract.md](../docs/04-api-contract.md).
