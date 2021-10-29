const initialState = {
    page: 1, 
    order: "", 
    name: "", 
    games: [],
    rating: "",
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALLGAMES':
            return { ...state, games: action.payload };
        default:
            return state;
    }
};

export default rootReducer;