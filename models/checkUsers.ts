import { collection_accounts } from '../index';

export async function checkUsers(id: number) {
    try{
        const details = { 'id': Number(id) };
        const news = await collection_accounts.findOne(details);
        return news;
    }
    catch(error){
        console.log(`checkNews >> ${error}`)
        return false
    }
}

export default checkUsers;