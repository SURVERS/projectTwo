import { giveAllRolesTable } from '../models/giveAllRoles'

export async function giveAllRoles () {
    try {
        interface UserData {}
        
        const news: any[] = await giveAllRolesTable();
        if (news.length === 0)
            return 0;
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
export default giveAllRoles;