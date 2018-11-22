## Starting Local dev database

    % docker-compose -f db.yaml up

## Sequelize CLI:

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
