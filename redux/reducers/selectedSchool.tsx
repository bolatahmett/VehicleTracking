import { School } from "../../model/School";

const selectedSchool = (state = null as any, action: { type: any; school: School }) => {
    switch (action.type) {
        case 'SET_SELECTED_SCHOOL':
            return action.school;
        default:
            return state
    }
}

export default selectedSchool;