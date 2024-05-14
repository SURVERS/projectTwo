import { db, collection_news } from '../index';

export async function CreateNews(params: any, URL: string) {
    try{
        let last_id: number
        let new_slug: string
        const parsedParams = JSON.parse(params);

        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        const lastRecord = await collection_news.find().sort({ _id: -1 }).limit(1).toArray();

        if (lastRecord.length > 0) {
            last_id = Number(lastRecord[0].id);
            last_id = last_id + 1;
            new_slug = `${URL}/#/News/${last_id}/show`
        } else {
            last_id = 1;
            new_slug = `${URL}/#/News/${last_id}/show`;
        }
        const newNews = ({
            id: last_id,
            hidden: parsedParams.hidden,
            title: parsedParams.title,
            description: parsedParams.description,
            slug: new_slug,
            urlPreview: 'http://localhost:3000/api/img/news/' + last_id,
            preview: 'http://localhost:3000/api/img/news/' + last_id,
            createdAt: `${day}.${month}.${year}`
        });

        await collection_news.insertOne(newNews);
        return last_id
    }
    catch(error){
        console.log(`Произошла ошибка в CreateNews: ${error}`)
        return error
    }
}

export default CreateNews;