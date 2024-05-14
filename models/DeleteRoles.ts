import { collection_roles } from '../index';

export async function DeleteRoles(params: any) {
    try{
        const result = await collection_roles.deleteMany({ id: { $in: params } });
        return result
    }
    catch(error){
        console.log(`Произошла ошибка в DeleteNews: ${error}`)
        return error
    }
}

export default DeleteRoles;