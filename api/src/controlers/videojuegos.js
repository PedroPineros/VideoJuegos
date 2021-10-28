const { Videogame, Genres } = require('../db');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { KEY } = process.env;




const getAllGames = async (req, res, next) => {
    try {
        let { gameName, page, order, rating } = req.query;
        var allGamesApi, allGamesDb, GamesConcat, genresDb, genresApi, genresConcat;
        page = page ? page : 1;
        const limitPage = 15;
        //-----------Todos los juegos------------------//
        const pageGames1 = axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=40&page=1`)
        const pageGames2 = axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=40&page=2`)
        const pageGames3 = axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=40&page=3`)
        allGamesApi = await Promise.all([pageGames1, pageGames2, pageGames3]);
        allGamesApi = allGamesApi.map(e => e.data.results)
        allGamesApi = allGamesApi.flat().map(e => {
            return {
                id: e.id,
                name: e.name,
                background_image: e.background_image,
                Genres: e.genres.map(g => g.name),
                rating_top: e.rating_top,
                platforms: e.platforms.map(p => p.platform.name),
                description: e.description,
                date: e.released,
            }
        })
        allGamesDb = await Videogame.findAll({ include: { model: Genres, attributes: ['name'], through: { attributes: [] } } });
        allGamesDb = allGamesDb.map(e => {
            return {
                id: e.id,
                name: e.name,
                background_image: e.background_image,
                Genres: e.Genres.map(g => g.name),
                rating_top: e.rating_top,
                platforms: e.plataforms,
                description: e.description,
                date: e.date,
            }
        })
        GamesConcat = allGamesDb.concat(allGamesApi);

        if (order || rating || gameName) {
            //-----------Busqueda por nombre------------------//
            if (gameName) {
                console.log(gameName)
                let lowergetName = gameName.toLowerCase();
                GamesConcat = GamesConcat.filter(e => e.name.toLowerCase().includes(lowergetName))
                if (GamesConcat.length === 0) {
                    return res.status(404).json({
                        message: 'No se encontraron resultados'
                    })
                }
            }
            //-----------Order asc-desc------------------//
            if (order === "asc") {
                GamesConcat = GamesConcat.sort((a, b) => {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                })
            }
            if (order === "desc") {
                GamesConcat = GamesConcat.sort((a, b) => {
                    return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
                })
            }
            //-----------Rating------------------//
            if (rating === "top") {
                GamesConcat = GamesConcat.sort((a, b) => {
                    return a.rating_top - b.rating_top
                })
            } if (rating === "botton") {
                GamesConcat = GamesConcat.sort((a, b) => {
                    return b.rating_top - a.rating_top
                })
            }
        }
        //-----------Paginacion------------------//
        if (page) {
            GamesConcat = GamesConcat.slice((page - 1) * limitPage, page * limitPage)
        }
       

        res.status(200).json({ cont: GamesConcat.length, gamesConcat: GamesConcat });
    } catch (err) {
        next(err);
    }
}

const postNewGame = async (req, res, next) => {
    const { name, description, date, rating_top, plataforms, background_image, genres } = req.body;
    if (!name || !description || !plataforms) {
        return res.status(400).json({
            message: 'Faltan datos'
        })
    }
    try {
        const newGame = await Videogame.create({
            id: uuidv4(),
            name,
            description,
            date,
            rating_top,
            plataforms,
            background_image,
        });
        if (genres) {
            const genresDb = await Genres.findAll({
                where: {
                    name: genres,
                },
                attributes: ['id']
            })
            newGame.addGenres(genresDb)
        }
        res.send(newGame)
    } catch (err) {
        next(err);
    }
    // try {
    //     const { name, description, date, rating, plataforms, background_image, genres } = req.body;
    //     const newGame = await Videogame.create({
    //         id: uuidv4(),
    //         name,
    //         description,
    //         date,
    //         rating,
    //         plataforms,
    //         background_image
    //     });
    //     if (!name || !description || !plataforms) {
    //         return res.status(400).json({
    //             message: 'Faltan datos'
    //         })
    //     }
    //     const ga = await newGame.addGenres(genres)

    //       res.json(ga)

    // } catch (err) {
    //     next(err);
    // }
}

const getGameById = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id)
        if (isNaN(id)) {
            console.log(id)
            var game = await Videogame.findByPk(id)
        } else {
            game = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${KEY}`)).data;
            console.log(game)
        }
        return res.json(game);
    } catch (err) {
        next("No encontrado");
    }
}


module.exports = { getAllGames, postNewGame, getGameById }