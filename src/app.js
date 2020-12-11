const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//importar rutas

const customerRoutes = require('./routes/customer');
const { urlencoded } = require('express');

//configuraciones del servidor
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//funciones antes de las peticiones
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    port: 3306,
    database: 'crudnode'


}, 'single'))
app.use(express.urlencoded({extended: true}));
//rutas
app.use('/', customerRoutes);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//inicializar servidor
app.listen(app.get('port'), () => {
    console.log('Server iniciado en el puerto 3000');
});