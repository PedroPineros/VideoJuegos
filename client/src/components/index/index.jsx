import React, { useEffect} from "react";
import { useSelector, useDispatch} from 'react-redux'
import { get_AllGames } from '../../action/actions'
import Loading from "../loading/loading";
import './index.css'

function Index() {    
    const dispatch = useDispatch()
    const { page, order, name, games } = useSelector(state => state)
    useEffect(() => {
        dispatch(get_AllGames({}))
    }, [dispatch])

    const handlepage = (page) => {
        dispatch(get_AllGames({ page, order, name }))
    }
    console.log(games.gamesConcat)
if(games.gamesConcat === undefined){
    return(
        <Loading/>
    )
}else{
    return (
        <div>
            <h1>Games</h1>
            {games.gamesConcat.map((game, i) => {
                return (
                    <div key={i}>
                        <h2>{game.name}</h2>
                        <img className="imgCard" src={game.background_image} alt="" />
                        <ul>
                            {
                                game.Genres.map((genre, i) => {
                                    return (
                                        <li key={i}>{genre}</li>
                                    )
                                })

                            }
                        </ul>
                    </div>
                )
            })
        }
        </div>
    )
}
}
export default (Index)