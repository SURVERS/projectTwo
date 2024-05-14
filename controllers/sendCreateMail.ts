import { CreateMail } from '../models/CreateMail'

export async function sendCreateMail (params: any) {
    try {
        const url = `http://localhost:5173`;

        const result = await CreateMail(params, url);
        return result
    } 
    catch (error) {
        console.log(`Произошла ошибка в sendCreateNews: ${error}`)
        return false;
    }
};
export default sendCreateMail;