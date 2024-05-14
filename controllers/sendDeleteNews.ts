import { DeleteNews } from '../models/DeleteNews'

export async function sendDeleteNews (params: any) {
    try {
        const result = await DeleteNews(params)
        return result.deletedCount !== 0 ? true : false
    } 
    catch (error) {
        console.log(error)
        return false;
    }
};
export default sendDeleteNews;