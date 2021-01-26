if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const directorRouter = require('./routes/directors');
const movieRouter = require('./routes/movies');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(methodOverride('_method'));

const mongoose = require('mongoose');
const movie = require('./models/movie');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

app.use('/', indexRouter);
app.use('/directors', directorRouter);
app.use('/movies', movieRouter);

app.listen(process.env.PORT || 3000);
