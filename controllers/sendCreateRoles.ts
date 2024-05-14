import { CreateRoles } from '../models/CreateRoles'

export async function sendCreateRoles (params: any) {
    try {
        const url = `http://localhost:5173`;

        const result = await CreateRoles(params, url);
        return result
    } 
    catch (error) {
        console.log(`Произошла ошибка в sendCreateNews: ${error}`)
        return false;
    }
};
export default sendCreateRoles;