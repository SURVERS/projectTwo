import { checkNews } from '../models/checkNews'

export async function giveNews (id: number) {
    try {
        const result = await checkNews(id)
        return result
    } 
    catch (error) {
        console.log(error)
        return false;
    }
};
export default giveNews;