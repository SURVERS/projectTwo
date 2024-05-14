import { redis } from '../index';

export async function checkUUID(uuid:string){
    const sessionExists = await redis.get(uuid);
    return sessionExists
}

export default checkUUID;