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
        case 'SET_SELECTED_DATE':
            return Object.assign({}, state, {
                selected: {
                    date: action.date,
                    temp: state.selected.temp
                }
            });
        case 'SET_SELECTED_TEMP':
            return Object.assign({}, state, {
                selected: {
                    date: state.selected.date,
                    temp: action.temp
                }
            });
        default:
            return state;
    }    
}