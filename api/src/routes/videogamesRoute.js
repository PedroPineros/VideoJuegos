const {Router} = require('express');
const router = Router();
const {getAllGames} = require('../controlers/videojuegos');

router.get('/', getAllGames);

module.exports = router;