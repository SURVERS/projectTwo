import { CreateTableRequest } from '../models/CreateTableRequest'

export async function sendRequest (phoneNumber: string, name: string, mail: string, request_post: string) {
    try {
        const currentDateTime: Date = new Date();
        const date: string = `${currentDateTime.getFullYear()}-${currentDateTime.getMonth() + 1}-${currentDateTime.getDate()}`;
        const time: string = `${currentDateTime.getHours()}:${currentDateTime.getMinutes()}:${currentDateTime.getSeconds()}`;
        const currentDateTimeString: string = `${date} ${time}`;
        
        const result = await CreateTableRequest(phoneNumber, name, mail, request_post, currentDateTimeString);
        return result
    } 
    catch (error) {
        console.log(`Произошла ошибка в sendRequestController: ${error}`)
        return false;
    }
};
export default sendRequest;