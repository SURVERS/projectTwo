import { collection_mail } from '../index';

export async function giveAllMailTable() {
    try{
        const mail = await collection_mail.find().toArray();
        const updatedAccounts = mail.map(account => {
            const { _id, ...rest } = account;
            return rest;
        });
        return updatedAccounts;
    }
    catch(error){
        return false
    }
}

export default giveAllMailTable;