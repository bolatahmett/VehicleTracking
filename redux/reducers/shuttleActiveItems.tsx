import { Shuttle } from "../../model/Shuttle";

const shuttleActiveItems = (state = [] as any, action: { type: any; items: Shuttle[] }) => {
    switch (action.type) {
        case 'SET_ACTIVE_SHUTTLE_ITEMS':
            // console.log(action.items)
            return action.items;
        default:
            return state
    }
}

export default shuttleActiveItems;