export function changeLocation(location){
    return {
        type: 'CHANGE_LOCATION',
        location: location
    };
}

export function setSelectedDate(date){
    return {
        type: 'SET_SELECTED_DATE',
        date: date
    };
}

export function setSelectedTemp(temp){
    return {
        type: 'SET_SELECTED_TEMP',
        temp: temp
    };
}