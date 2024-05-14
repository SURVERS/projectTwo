import { collection_mail } from '../index';

export async function UpdateTemplates(params: any, id: number) {
    try{
        const filter = { id: Number(id) };
        const parsedParams = JSON.parse(params);
        const updateDoc = {
            $set: {
                name: parsedParams['name'],
                template: parsedParams['template']
            }
        };
        const result = await collection_mail.updateOne(filter, updateDoc);
        if (result.modifiedCount > 0) {
            console.log('Данные успешно обновлены');
            return true;
        } else {
            console.log('Данные не были обновлены');
            return false;
        }
    }
    catch(error){
        console.log(`Произошла ошибка в UpdateTemplates: ${error}`)
        return error
    }
}

export default UpdateTemplates;