import { getNewIDNews } from '../models/getNewIDNews'

export async function sendGetNewIDNews () {
    try {
        const result = await getNewIDNews()
        return result
    } 
    catch (error) {
        console.log(error)
        return false;
    }
};
export default sendGetNewIDNews;