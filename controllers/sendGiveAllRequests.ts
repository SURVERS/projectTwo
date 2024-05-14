import { giveAllRequestsTable } from '../models/giveAllRequestsTable'

export async function giveAllRequests () {
    try {
        interface UserData {}
        
        const requests: any[] = await giveAllRequestsTable();
        if (requests.length === 0)
            return 0;
        let requestsData = {
            data: [] as UserData[],
            total: 0
        };
    
        requestsData.data.push(...requests);
        requestsData.total++;
        
        return requestsData;
    } 
    catch (error) {
        console.log(`Произошла ошибка в sendRequestController: ${error}`)
        return false;
    }
};
export default giveAllRequests;