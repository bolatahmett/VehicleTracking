import { Driver } from "../../model/Driver";

const driverItems = (state = null as any, action: { type: any; items: Driver[] }) => {
    switch (action.type) {
        case 'SET_DRIVER_ITEMS':
            return action.items;
        default:
            return state
    }
}

export default driverItems;