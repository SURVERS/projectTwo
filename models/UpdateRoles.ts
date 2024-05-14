import { collection_roles } from '../index';

export async function UpdateRoles(params: any, id: number) {
    try{
        const filter = { id: Number(id) };
        const parsedParams = JSON.parse(params);
        const updateDoc = {
            $set: {
                name_roles: parsedParams['name_roles']
            }
        };
        const result = await collection_roles.updateOne(filter, updateDoc);
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

export default UpdateRoles;