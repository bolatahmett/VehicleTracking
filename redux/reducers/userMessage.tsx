
const userMessage = (state = null, action: { type: any; message: any }) => {
    switch (action.type) {
        case 'SHOW_MESSAGE':
            return action.message;
        default:
            return state
    }
}

export default userMessage;