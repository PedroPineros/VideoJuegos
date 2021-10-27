const { Router } = require('express');
const videogamesRoute = require('./videogamesRoute');

const router = Router();

router.use("/GamesAll", videogamesRoute);

module.exports = router;
