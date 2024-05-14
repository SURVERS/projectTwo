import { redis } from '../index';

export async function deleteSessionData(token:string){
    try{
        const keys = await redis.keys('*');
        for (const key of keys) {
            const val = await redis.get(key);
            if (val === token) {
                await redis.del(key);
                break;
            }
        }
        return true;
    }
    catch(error){
        return false
    }
}
export default deleteSessionData