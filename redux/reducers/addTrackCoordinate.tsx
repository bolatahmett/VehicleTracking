
const addTrackCoordinate = (state = {} as any, action: { type: any; coordinate: any }) => {
    switch (action.type) {
        case 'ADD_TRACK_COORDINATE':
            return action.coordinate;
        default:
            return state
    }
}

export default addTrackCoordinate;