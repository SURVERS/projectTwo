import { collection_news } from '../index';

export async function DeleteNews(params: any) {
    try{
        const result = await collection_news.deleteMany({ id: { $in: params } });
        return result
    }
    catch(error){
        console.log(`Произошла ошибка в DeleteNews: ${error}`)
        return error
    }
}

export default DeleteNews;