import { Driver } from "../../model/Driver";

const selectedDriver = (state = null as any, action: { type: any; driver: Driver }) => {
    switch (action.type) {
        case 'SET_SELECTED_DRIVER':
            return action.driver;
        default:
            return state
    }
}

export default selectedDriver;