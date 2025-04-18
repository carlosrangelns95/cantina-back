## Compile and run the project

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

## To do list:

- Instalar dependências - (typeorm, swagger, nest-config)
- revisar variaveis
- conectar o banco de dados
- abstrair mailer, upload
- melhorar forma de filtragem (criar utilitario)
- criar o perfil de users
- configurar logs
- atualizar todas as dependencias
- verificar erros


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
