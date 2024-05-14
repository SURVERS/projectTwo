import { verify } from 'jsonwebtoken';
import { secretKey } from '../index';
import { checkUUID } from '../models/checkUserToken'

export async function verifyToken (token: string) {
    try {
        const result_three: boolean = await new Promise((resolve, reject) => {
            verify(token, secretKey, async (err, decoded) => {
                if (err) {
                    resolve(false);
                } else {
                    const decodedData = decoded as { [key: string]: any };
                    const uuiduser = decodedData.data.uuid
                    const login = decodedData.data.login
                    try{
                        const sessionExists = await checkUUID(uuiduser)
                        if (sessionExists === token)
                            resolve(true);
                        else
                        resolve(false);
                    }
                    catch(error){
                        console.log(error)
                        resolve(false);
                    }
                }
            })
        });
        return result_three
    } 
    catch (error) {
        return false;
    }
};
export default verifyToken;