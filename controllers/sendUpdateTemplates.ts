import { UpdateTemplates } from '../models/UpdateTemplates'

export async function sendUpdateTemplates (params: any, id: number) {
    try {
        const result = await UpdateTemplates(params, id)
        return result
    } 
    catch (error) {
        console.log(error)
        return false;
    }
};
export default sendUpdateTemplates;