import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/indexRouter';
import mainRouter from './routes/mainRouter';
import MongoAtlas from './database';

const app = express();

const dbName = 'things'
const database = new MongoAtlas(dbName);
database.connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/main', mainRouter);

module.exports = app;
