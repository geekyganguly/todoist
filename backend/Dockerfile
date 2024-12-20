FROM php:8.4.1-fpm

# Install Additional System Dependencies
RUN apt-get update && apt-get install -y git zip unzip curl nginx supervisor libpq-dev libzip-dev 

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql zip

# Set the working directory
WORKDIR /var/www

# Copy the application code
COPY . .

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install project dependencies
RUN composer install

# Set permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Copy Nginx configuration
COPY ./nginx.conf /etc/nginx/sites-available/default

# Expose ports for Nginx
EXPOSE 80

# Add supervisor to manage processes
COPY ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Start Supervisor to manage both PHP-FPM and Nginx
CMD ["/usr/bin/supervisord"]
