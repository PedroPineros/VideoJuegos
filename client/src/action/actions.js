import axios from 'axios';

export function get_AllGames(){
    return async function(dispatch){
        const Games = await axios.get('http://localhost:3001/GamesAll');
        dispatch({
            type: 'GET_ALLGAMES',
            payload: Games.data
        })
    }
}
