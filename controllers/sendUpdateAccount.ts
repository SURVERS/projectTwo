import { UpdateAccount } from '../models/UpdateAccount'

export async function sendUpdateAccount (params: any, id: number) {
    try {
        const result = await UpdateAccount(params, id)
        return result
    } 
    catch (error) {
        console.log(error)
        return false;
    }
};
export default sendUpdateAccount;