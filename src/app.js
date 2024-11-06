const express = require('express');
const app = express();
const animeRouter = require('./routers/anime-router');
const authRouter = require('./routers/auth-router');
const userRouter = require('./routers/user-router');

// Middleware para interpretar JSON
app.use(express.json());

app.use(animeRouter);
app.use(authRouter);
app.use(userRouter);


module.exports =  app;