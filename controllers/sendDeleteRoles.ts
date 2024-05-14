import { DeleteRoles } from '../models/DeleteRoles'

export async function sendDeleteRoles (params: any) {
    try {
        const result = await DeleteRoles(params)
        return result.deletedCount !== 0 ? true : false
    } 
    catch (error) {
        console.log(error)
        return false;
    }
};
export default sendDeleteRoles;