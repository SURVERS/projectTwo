import { collection_news } from '../index';

export async function checkNews(id: number) {
    try{
        const details = { 'id': Number(id) };
        const news = await collection_news.findOne(details);
        return news;
    }
    catch(error){
        console.log(`checkNews >> ${error}`)
        return false
    }
}

export default checkNews;