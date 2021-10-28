const {Router} = require('express');
const router = Router();
const {getGenres} = require('../controlers/generos')

router.get('/', getGenres);
module.exports = router;