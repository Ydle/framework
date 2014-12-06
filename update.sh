#!/bin/sh

rm -rf composer.json composer.lock
wget https://raw.githubusercontent.com/Ydle/framework/master/composer.json
wget https://raw.githubusercontent.com/Ydle/framework/master/composer.lock
chmod 775 composer.*

php composer.phar install -vv
app/console assets:install web --symlink --env=prod
app/console assetic:dump --env=prod
app/console cache:clear --env=prod
chmod -R 777 app/cache
chmod -R 777 app/logs

