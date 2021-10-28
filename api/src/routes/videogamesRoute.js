const {Router} = require('express');
const router = Router();
const {getAllGames, postNewGame, getGameById} = require('../controlers/videojuegos');

router.get('/', getAllGames);
router.post('/', postNewGame);
router.get('/:id', getGameById)
module.exports = router;