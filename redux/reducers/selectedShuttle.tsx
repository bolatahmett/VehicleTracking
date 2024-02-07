import { Shuttle } from "../../model/Shuttle"

const selectedShuttle = (state = {} as any, action: { type: any; shuttle: Shuttle }) => {
    switch (action.type) {
        case 'SET_SELECTED_SHUTTLE':
            return action.shuttle;
        default:
            return state
    }
}

export default selectedShuttle;