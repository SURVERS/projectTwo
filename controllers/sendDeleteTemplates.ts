import { DeleteTemplates } from '../models/DeleteTemplates'

export async function sendDeleteTemplates (params: any) {
    try {
        const result = await DeleteTemplates(params)
        return result.deletedCount !== 0 ? true : false
    } 
    catch (error) {
        console.log(error)
        return false;
    }
};
export default sendDeleteTemplates;