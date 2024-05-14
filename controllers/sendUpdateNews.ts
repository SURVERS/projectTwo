import { UpdateNews } from '../models/UpdateNews'

export async function sendUpdateNews (params: any, id: number) {
    try {
        const result = await UpdateNews(params, id)
        return result
    } 
    catch (error) {
        console.log(error)
        return false;
    }
};
export default UpdateNews;