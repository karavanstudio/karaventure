#!/bin/sh

set -e

echo "🚀 Starting Laravel container..."

cd /var/www/html

# Check for reset flag (set RESET_APP=true to trigger full reset)
if [ "$RESET_APP" = "true" ]; then
    echo "⚠️  RESET_APP flag detected. Performing full reset..."

    # Remove database
    rm -f /var/www/html/database/database.sqlite

    # Remove seeded flag
    rm -f /var/www/html/storage/.seeded

    # Clear storage (but preserve directory structure)
    rm -rf /var/www/html/storage/framework/sessions/*
    rm -rf /var/www/html/storage/framework/views/*
    rm -rf /var/www/html/storage/framework/cache/*
    rm -rf /var/www/html/storage/logs/*
    rm -rf /var/www/html/storage/app/public/*

    echo "✅ Reset complete. Fresh database and storage will be created."
fi

# Ensure storage directories exist with proper permissions
mkdir -p /var/www/html/storage/framework/{sessions,views,cache}
mkdir -p /var/www/html/storage/logs
mkdir -p /var/www/html/storage/app/public
chown -R www-data:www-data /var/www/html/storage
chmod -R 775 /var/www/html/storage

# Storage link
php artisan storage:link || true

# Ensure database directory and file exist
if [ ! -f /var/www/html/database/database.sqlite ]; then
    echo "Creating SQLite database..."
    touch /var/www/html/database/database.sqlite
fi

# Fix permissions for database directory to allow WAL creation
chown -R www-data:www-data /var/www/html/database
chmod -R 775 /var/www/html/database

# Enable WAL mode for better concurrency
sqlite3 /var/www/html/database/database.sqlite "PRAGMA journal_mode=WAL;"
sqlite3 /var/www/html/database/database.sqlite "PRAGMA synchronous=NORMAL;"
sqlite3 /var/www/html/database/database.sqlite "PRAGMA busy_timeout=30000;"

# ===============================
# Laravel Setup
# ===============================

echo "⚙️ Running Laravel setup..."

# Run migrations
php artisan migrate --force

php artisan config:clear || true
php artisan cache:clear || true
php artisan route:clear || true
php artisan view:clear || true

# Seed essential data on first run only
if [ ! -f /var/www/html/storage/.seeded ]; then
    php artisan db:seed --force

    touch /var/www/html/storage/.seeded
    echo "Essential data seeded successfully!"
fi

# Optimize
php artisan optimize

echo "Application is ready!"

# ===============================
# Start services
# ===============================

echo "🔥 Starting Supervisor..."

exec /usr/bin/supervisord -c /etc/supervisord.conf