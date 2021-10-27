const { Videogame, Genres } = require('../db');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { KEY } = process.env;




const getAllGames = async (req, res, next) => {
    try {
        let { gameName } = req.query;
        
        //-----------Todos los juegos------------------//
        const pageGames1 = axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=40&page=1`)
        const pageGames2 = axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=40&page=2`)
        const pageGames3 = axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=40&page=3`)
        var allGames = await Promise.all([pageGames1, pageGames2, pageGames3]);
        var allGames = allGames.map(e => e.data.results)
        var g = allGames.flat().map(e => {
            return {
                id: e.id,
                name: e.name,
                background_image: e.background_image,
                genres: e.genres.map(g => g.name)
            }
        })
        const bd = await Videogame.findAll({ includes: { model: Genres, attributes: ['name'], through: { attributes: [] } } });
        var all = bd.concat(g);
        console.log(gameName)
        if (gameName){
            let lowergetName = gameName.toLowerCase();
            all = all.filter(e => e.name.toLowerCase().includes(lowergetName))
            if (all.length === 0){
                res.status(404).json({
                    message: 'No se encontraron resultados'
                })
            }
        }
        res.status(200).json(all);
    } catch (err) {
        next(err);
    }
}

const getGenres = async (req, res, next) => {
    
}
module.exports = { getAllGames };