# BlogUI App
Una aplicación Javascript Fullstack. Se trata de un gestor de contenidos simplicado (inicialmente un blog) creado con la intención de aprender y poner en practica conocimientos de programación. [Ir al repositorio del frontend](https://github.com/pabcha/frontend-blogui).

Para ver el live demo -> [https://frontend-blogui.vercel.app/](https://frontend-blogui.vercel.app/)

## Stack tecnológico

- [Node 14.15.0][node]
- [NPM 6.14.5][node]
- [Express 4.17][express]
- [crypto-js][cryptojs]
- [json web tokens][webtokens]
- [node-postgres][pg]
- Hosting: [Heroku][heroku]
 
[Stack tecnológico del backend](https://github.com/pabcha/backend-blogui)

[express]: https://expressjs.com/
[node]: https://nodejs.org/
[heroku]: https://heroku.com/
[cryptojs]: https://github.com/brix/crypto-js
[webtokens]: https://github.com/auth0/node-jsonwebtoken
[pg]: https://github.com/brianc/node-postgres

## Instalación
```sh
$ git clone https://github.com/pabcha/backend-blogui.git
$ cd backend-blogui
$ npm install
```
Crear un archivo `.env` tomando como referencia `.env.example`. Al archivo .env agregar `DATABASE_URL=postgresql://{user}:{password}d@localhost:{5432}/{databasename}` (sin las llaves) y `ALLOW_ORIGIN=http://localhost:4200` con la url del frontend.
```sh
$ npm run dev
```

En el navegador ir a http://localhost:5000