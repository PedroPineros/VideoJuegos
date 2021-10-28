const { Videogame, Genres } = require('../db');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { KEY } = process.env;

const getGenres = async (req, res, next) => {
    try {
        const genresDb = await Genres.findAll();
        if(genresDb.length === 0){
            let genres = await axios.get(`https://api.rawg.io/api/genres?key=${KEY}&page_size=40&page=1`);
            genres = genres.data.results.map(genre => {
                return {
                    id: uuidv4(),
                    name: genre.name
                }
            })
            await Genres.bulkCreate(genres);
            res.status(200).json(genres);
        }else{
            let obj = await Genres.findAll();
            res.status(200).json(obj);
        }
    }catch(error){
        next(error);
    }
}
module.exports = {getGenres};