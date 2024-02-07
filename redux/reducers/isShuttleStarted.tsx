
const isShuttleStarted = (state = false as any, action: { type: any; isShuttleStarted: boolean }) => {
    switch (action.type) {
        case 'SET_SHUTTLE_STATUS':
            return action.isShuttleStarted;
        default:
            return state
    }
}

export default isShuttleStarted;