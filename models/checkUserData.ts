import { collection_accounts, redis } from '../index';

export async function setUserToken(token: string, uuids: string){
    await redis.set(uuids, token, 'EX', 1800);
    return uuids
}

export async function checkUserData(login: string, password: string) {
    const details = { 'login': login };
    try{
        const account = await collection_accounts.findOne(details);
        if (account.password === password)
            return true
        return 'Неверный логин или пароль'
    }
    catch(error){
        return `Неверный логин или пароль`
    }
}

export default checkUserData;