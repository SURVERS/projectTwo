import { UpdateRoles } from '../models/UpdateRoles'

export async function sendUpdateRoles (params: any, id: number) {
    try {
        const result = await UpdateRoles(params, id)
        return result
    } 
    catch (error) {
        console.log(error)
        return false;
    }
};
export default sendUpdateRoles;