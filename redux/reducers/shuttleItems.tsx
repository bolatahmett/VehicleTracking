import { Shuttle } from "../../model/Shuttle";

const shuttleItems = (state = null as any, action: { type: any; items: Shuttle[] }) => {
    switch (action.type) {
        case 'SET_SHUTTLE_ITEMS':
            return action.items;
        default:
            return state
    }
}

export default shuttleItems;