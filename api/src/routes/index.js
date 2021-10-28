const { Router } = require('express');
const videogamesRoute = require('./videogamesRoute');
const genresRoute = require('./genresRoute');

const router = Router();

router.use("/GamesAll", videogamesRoute);
router.use("/GamesGenres", genresRoute);

module.exports = router;
