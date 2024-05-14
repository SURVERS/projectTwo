import { checkRoles } from '../models/checkRole'

export async function giveRoles (id: number) {
    try {
        const result = await checkRoles(id)
        return result
    } 
    catch (error) {
        console.log(error)
        return false;
    }
};
export default giveRoles;