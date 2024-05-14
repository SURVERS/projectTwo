import { collection_news } from '../index';

export async function UpdateNews(params: any, id: number) {
    try{
        const filter = { id: Number(id) };
        const parsedParams = JSON.parse(params);
        const updateDoc = {
            $set: {
                title: parsedParams['title'],
                description: parsedParams['description'],
                slug: parsedParams['slug'],
                preview: parsedParams['preview'],
                hidden: parsedParams['hidden'],
                createdAt: parsedParams['createdAt']
            }
        };
        const result = await collection_news.updateOne(filter, updateDoc);
        if (result.modifiedCount > 0) {
            console.log('Данные успешно обновлены');
            return true;
        } else {
            console.log('Данные не были обновлены');
            return false;
        }
    }
    catch(error){
        console.log(`Произошла ошибка в UpdateAccounts: ${error}`)
        return error
    }
}

export default UpdateNews;