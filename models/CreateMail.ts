import { collection_mail } from '../index';

export async function CreateMail(params: any, URL: string) {
    try{
        let last_id: number
        const parsedParams = JSON.parse(params);

        const lastRecord = await collection_mail.find().sort({ _id: -1 }).limit(1).toArray();

        if (lastRecord.length > 0) {
            last_id = Number(lastRecord[0].id);
            last_id = last_id + 1;
        } else {
            last_id = 1;
        }
        const newNews = ({
            id: last_id,
            name: parsedParams.name,
            template: parsedParams.template
        });

        await collection_mail.insertOne(newNews);
        return last_id
    }
    catch(error){
        console.log(`Произошла ошибка в CreateMail: ${error}`)
        return error
    }
}

export default CreateMail;