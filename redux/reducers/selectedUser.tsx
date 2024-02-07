import { User } from "../../model/User";

const selectedUser = (state = null as any, action: { type: any; user: User }) => {
    switch (action.type) {
        case 'SET_SELECTED_USER':
            return action.user;
        default:
            return state
    }
}

export default selectedUser;