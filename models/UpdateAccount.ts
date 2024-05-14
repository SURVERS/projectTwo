import { collection_accounts } from '../index';

export async function UpdateAccount(params: any, id: number) {
    try{
        const filter = { id: Number(id) };
        const parsedParams = JSON.parse(params);
        const updateDoc = {
            $set: {
                last_name: parsedParams['last_name'],
                fist_name: parsedParams['fist_name'],
                login: parsedParams['login'],
                password: parsedParams['password'],
                role: parsedParams['role'],
                middle_name: parsedParams['middle_name']
            }
        };
        const result = await collection_accounts.updateOne(filter, updateDoc);
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

export default UpdateAccount;