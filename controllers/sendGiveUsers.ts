import { checkUsers } from '../models/checkUsers'

export async function giveUsers (id: number) {
    try {
        const result = await checkUsers(id)
        return result
    } 
    catch (error) {
        console.log(error)
        return false;
    }
};
export default giveUsers;