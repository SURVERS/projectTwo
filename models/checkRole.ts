import { collection_roles } from '../index';

export async function checkRoles(id: number) {
    try{
        const details = { 'id': Number(id) };
        const roles = await collection_roles.findOne(details);
        return roles;
    }
    catch(error){
        console.log(`checkNews >> ${error}`)
        return false
    }
}

export default checkRoles;