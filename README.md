## Compile and run the project

ao baixar o projeto primeiro instale as dependencias:
```bash
npm install
```

Após a instalação, execute as seeds para popular o banco com dados iniciais:
```bash
npm run seed
```

Para iniciar o projeto, execute:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# docker compose
$ docker-compose up -d
```

## Migrations
```bash
## Criar uma migration:
$ npm run migration:create -name=nome-da-migration

## Executar as migrations:
$ npm run migration:run

## Reverter as migrations:
$ npm run migration:revert
```  

## tecnologias utilizadas
- NestJS - https://nestjs.com/
- TypeORM e mysql2 - https://typeorm.io/
- Mailer - https://nodemailer.com/
- Swagger - https://swagger.io/
- Docker - https://www.docker.com/
- Cloudinary - https://cloudinary.com/
- bcrypt - https://www.npmjs.com/package/bcrypt
- jwt - https://www.npmjs.com/package/jsonwebtoken


## para atualizar todas as 
```bash
$ npm install -g npm-check-updates
$ ncu -u
$ npm install
```

## reinstalar todos os pacotes
```bash
$ Remove-Item -Recurse -Force node_modules, package-lock.json
$ npm install
```
