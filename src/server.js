const MongoStore = require('connect-mongo');
const express = require ('express');
const { engine: exphbs } = require ('express-handlebars');
const session = require ('express-session');
const passport = require ('passport');
const LocalStrategy = require ('passport-local').Strategy;

const app = express();

/* CONFIGURAR SESSION */

app.use(
    session({
        store: MongoStore.create( { mongoUrl: "mongodb://localhost/sessions" }),

        secret: 'abracadabra',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000
        },
    })
)

/* CONFIGURAR HANDLEBARS */
app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

/* CONFIGURAR PASSPORT */


/* CONFIGURAR SERVER */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

/* LISTEN SERVER */

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor: ${error}`))