import { collection_requests } from '../index';

export async function giveAllRequestsTable() {
    try{
        const requests = await collection_requests.find().toArray();
        const checkedRequests = requests.map(request => {
            const { _id, ...rest } = request;
            return rest;
        });
        return checkedRequests;
    }
    catch(error){
        return false
    }
}

export default giveAllRequestsTable;