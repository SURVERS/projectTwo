import { collection_news } from '../index';

export async function giveAllNewsTable(params: any) {
    try{
        const options = {
            sort: { [params.sort['field']]: params.sort['order'] == "ASC" ? 1 : -1 }, // сортировка по полю title в порядке возрастания (ASC)
            skip: (Number(params.pagination['page']) - 1) * Number(params.pagination['perPage']), // пропускать записи исходя из страницы (1) и количества записей на странице (25)
            limit: Number(params.pagination['perPage']) // количество записей на странице
        };
        const news = await collection_news.find({ hidden: false }, options).toArray();
        const checkedNews = news.map(news_a => {
            const { _id, ...rest } = news_a;
            return rest;
        });
        return checkedNews;
    }
    catch(error){
        console.log(`В giveAllNews.ts ${error}`)
        return false;
    }
}

export default giveAllNewsTable;