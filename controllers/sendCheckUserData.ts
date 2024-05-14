import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { checkUserData, setUserToken } from '../models/checkUserData'
import { secretKey } from '../index';

export async function sendCheckUserData(login: string, password: string) {
    try{
        const newUUID = uuidv4();
        const result = await checkUserData(login, password)
        if (result === true){
            const userData = {
                uuid: newUUID,
                login: login
            };
        
            const token = jwt.sign({ data: userData }, secretKey, { expiresIn: '30m' });
            await setUserToken(token, newUUID)
            return token
        }
        else
            return result
    }
    catch (error){
        return 'Неверный логин или пароль'
    }
}

export default sendCheckUserData;