const express = require('express');
const app = express();

const FilmesRoute = require('./routes/FilmesRoute')
const GeneroRoute = require('./routes/GeneroRoute')

//____________________________________Configurações____________________________________

app.set('port', process.env.PORT || 3000);

//____________________________________Middlewares____________________________________

app.use(express.json());

//____________________________________Rotas____________________________________

// ____________________________________Configurar CORS____________________________________

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin,X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'); res.header('Access-Control-Allow-Methods', 'GET,POST, OPTIONS, PUT, DELETE'); res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE'); next();
});

app.use('/Filme', FilmesRoute);

app.use('/Genero', GeneroRoute);

app.listen(app.get('port'), () => {
    console.log('start server on port' + app.get('port'))
})


