import { giveAllNewsTable } from '../models/giveAllNews'

export async function giveAllNews (params: any) {
    try {
        interface UserData {}
        
        const news: any[] = await giveAllNewsTable(params);
        
        let newsData = {
            data: [] as UserData[],
            total: 0
        };
    
        newsData.data.push(...news);
        newsData.total++;
        
        return newsData;
    } 
    catch (error) {
        console.log(error)
        return false;
    }
};
export default giveAllNews;