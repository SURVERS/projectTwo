import { db, collection_news } from '../index';

export async function getNewIDNews() {
    try{
        let last_id: number
        const lastRecord = await collection_news.find().sort({ _id: -1 }).limit(1).toArray();

        if (lastRecord.length > 0) {
            last_id = Number(lastRecord[0].id);
            last_id = last_id + 1;
        } else {
            last_id = 1;
        }
        return last_id
    }
    catch(error){
        console.log(`Произошла ошибка в CreateNews: ${error}`)
        return error
    }
}

export default getNewIDNews;