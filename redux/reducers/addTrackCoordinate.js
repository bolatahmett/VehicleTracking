var addTrackCoordinate = function (state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case 'ADD_TRACK_COORDINATE':
            return action.coordinate;
        default:
            return state;
    }
};
export default addTrackCoordinate;
