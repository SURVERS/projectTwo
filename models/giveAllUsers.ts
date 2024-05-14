import { collection_accounts } from '../index';

export async function giveAllUsersTable() {
    try{
        const accounts = await collection_accounts.find().toArray();
        const updatedAccounts = accounts.map(account => {
            const { _id, ...rest } = account;
            return rest;
        });
        return updatedAccounts;
    }
    catch(error){
        return false
    }
}

export default giveAllUsersTable;