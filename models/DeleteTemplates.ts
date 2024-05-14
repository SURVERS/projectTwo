import { collection_mail } from '../index';

export async function DeleteTemplates(params: any) {
    try{
        const result = await collection_mail.deleteMany({ id: { $in: params } });
        return result
    }
    catch(error){
        console.log(`Произошла ошибка в DeleteTemplates: ${error}`)
        return error
    }
}

export default DeleteTemplates;