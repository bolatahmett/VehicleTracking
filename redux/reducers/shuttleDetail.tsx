
const shuttleDetail = (state = null, action: { type: any; shuttleDetail: any }) => {
    switch (action.type) {
        case 'SHUTTLE_DETAIL':
            return action.shuttleDetail;
        default:
            return state
    }
}

export default shuttleDetail;