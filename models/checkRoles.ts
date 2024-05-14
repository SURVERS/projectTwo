import { collection_accounts } from '../index';

export async function checkUserRoles(login: string) {
    const details = { 'login': login };
    try{
        const account = await collection_accounts.findOne(details);
        return account.role;
    }
    catch(error){
        return false
    }
}

export default checkUserRoles;