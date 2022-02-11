var initialState = {
    location: '',
    data: {},
    dates: [],
    temps: [],
    selected: {
        date: '',
        temp: null
    }
};

// We export the reducer by default since it’ll be the only thing we’re exporting from this file
export default function mainReducer(state = initialState, action){
    switch (action.type) {
        case 'CHANGE_LOCATION':
            return Object.assign({}, state, {
                location: action.location
            });
        default:
            return state;
    }    
}