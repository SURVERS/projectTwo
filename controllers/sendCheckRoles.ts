import { verify } from 'jsonwebtoken';
import { secretKey } from '../index';
import { checkUserRoles } from '../models/checkRoles'

export async function verifyTokenRoles (token: string) {
    try {
        const result_three: boolean = await new Promise((resolve, reject) => {
            verify(token, secretKey, async (err, decoded) => {
                if (err) {
                    resolve(false);
                } else {
                    const decodedData = decoded as { [key: string]: any };
                    const login = decodedData.data.login
                    try{
                        const sessionExists = await checkUserRoles(login)
                        resolve(sessionExists)
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
export default verifyTokenRoles;