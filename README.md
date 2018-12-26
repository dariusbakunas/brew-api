# Brew-API

| master        | dev           |
| ------------- | ------------- |
| [![Build Status](https://travis-ci.org/dariusbakunas/brew-api.svg?branch=master)](https://travis-ci.org/dariusbakunas/brew-api) | [![Build Status](https://travis-ci.org/dariusbakunas/brew-api.svg?branch=dev)](https://travis-ci.org/dariusbakunas/brew-api)  |
| [![Coverage Status](https://coveralls.io/repos/github/dariusbakunas/brew-api/badge.svg?branch=master)](https://coveralls.io/github/dariusbakunas/brew-api?branch=master) | [![Coverage Status](https://coveralls.io/repos/github/dariusbakunas/brew-api/badge.svg?branch=dev)](https://coveralls.io/github/dariusbakunas/brew-api?branch=dev)             |

## Starting Local dev database

    % docker-compose -f db.yaml up

## Sequelize CLI:

    # generating migration
    % sequelize migration:generate --name migration-name

    # migrating schema
    % npm run db:[dev|prod] db:migrate
    
    # undo last migration
    % npm run db:[dev|prod] db:migrate:undo
    
    # undo all migrations
    % npm run db:[dev|prod] db:migrate:undo:all
    
    # seed database
    % npm run db:[dev|prod] db:seed -- --seed [path to seed file]

## Build docker image

    % docker build -t dariusbakunas/brew-api:YOUR_BRANCH_NAME_OR_TAG -f Dockerfile .
