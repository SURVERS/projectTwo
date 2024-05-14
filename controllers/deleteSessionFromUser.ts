import { verifyToken } from '../controllers/sendCheckUserToken'
import { deleteSessionData } from '../models/deleteSessionFromUser'
export async function deleteSession(token:string){
    const validate = await verifyToken(token)
    if (validate === true){
        await deleteSessionData(token)
        return true
    }
    else
        return false
}
export default deleteSession