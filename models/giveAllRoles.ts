import { collection_roles } from '../index';

export async function giveAllRolesTable() {
    try{
        const roles = await collection_roles.find().toArray();
        const checkedRoles = roles.map(news_a => {
            const { _id, ...rest } = news_a;
            return rest;
        });
        return checkedRoles;
    }
    catch(error){
        console.log(`В giveAllRolesTable.ts ${error}`)
        return false;
    }
}

export default giveAllRolesTable;