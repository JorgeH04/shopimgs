const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const multer = require('multer');
const uuid = require('uuid/v4');
const { format } = require('timeago.js');
const express = require('express');
const app = express();

//bbdd
require('./database');

//importing routes
const indexRoutes = require('./routes/index');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname));
    }
}) 
app.use(multer({storage}).single('image'));

// Global variables
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', indexRoutes);

// server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
