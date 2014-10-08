#!/bin/sh

bower install
app/console assets:install web --symlink --env=prod
grunt --verbose
app/console assetic:dump --env=prod
app/console cache:clear --env=prod
chmod -R 777 app/cache
chmod -R 777 app/logs
