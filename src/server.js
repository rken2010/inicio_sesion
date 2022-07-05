const express = require ('express');
const { engine: exphbs } = require ('express-handlebars');
const session = require ('express-session');
const passport = require ('passport');
const LocalStrategy = require ('passport-local').Strategy;

const app = express();

/* CONFIGURAR SESSION */

app.use(
    session({
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
passport.use(`login`,new LocalStrategy( (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            return done (err);
        if(!user) {
            return done(null, false);
        }
        if(!isValidPassword(user, password)) {
            return done(null, false);
        }
        return done(null, user);
        }
    })
}))

/* CONFIGURAR SERVER */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))