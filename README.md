# Brew-API

| master                                                                                                                                                                   | dev                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [![Build Status](https://travis-ci.org/dariusbakunas/brew-api.svg?branch=master)](https://travis-ci.org/dariusbakunas/brew-api)                                          | [![Build Status](https://travis-ci.org/dariusbakunas/brew-api.svg?branch=dev)](https://travis-ci.org/dariusbakunas/brew-api)                                       |
| [![Coverage Status](https://coveralls.io/repos/github/dariusbakunas/brew-api/badge.svg?branch=master)](https://coveralls.io/github/dariusbakunas/brew-api?branch=master) | [![Coverage Status](https://coveralls.io/repos/github/dariusbakunas/brew-api/badge.svg?branch=dev)](https://coveralls.io/github/dariusbakunas/brew-api?branch=dev) |

## Starting Local dev database

    % docker-compose -f db.yaml up -d

- run migration:
  % npm run db:dev db:migrate
- seed initial data:

      % npm run db:dev db:seed -- --seed src/db/seeders/*

- make sure quotes table has at least one entry
- manually add invitation to invitations table and use that code during initial user registration

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

## Install Helm Chart

    % helm install charts/brew-api --name brew-api --set "dbPassword"='dbsecret' --set "sendgridKey"='sendgridkey'

## Upgrade Helm Chart

    % helm upgrade brew-api charts/brew-api --set=image.tag=xx
