import { db, collection_requests } from '../index';

export async function CreateTableRequest(phoneNumber: string, name: string, mail: string, request_post: string, currentDateTimeString: string) {
    try {
        let last_id: number;

        const lastRecord = await collection_requests.find().sort({ _id: -1 }).limit(1).toArray();

        if (lastRecord.length > 0) {
            last_id = Number(lastRecord[0].id);
            last_id = last_id + 1;
        } else {
            last_id = 1;
        }
        const newRequest = ({
            id: last_id,
            phoneNumber: phoneNumber, // Добавляем phoneNumber в объект newNews
            name: name,
            mail: mail,
            request_post: request_post,
            dataTime: currentDateTimeString
        });

        await collection_requests.insertOne(newRequest);
        return last_id;
    } catch(error) {
        console.log(`Произошла ошибка в CreateTableRequest: ${error}`);
        return error;
    }
}

export default CreateTableRequest;