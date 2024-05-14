import { db, collection_roles } from '../index';

export async function CreateRoles(params: any, URL: string) {
    try{
        let last_id: number
        const parsedParams = JSON.parse(params);

        const lastRecord = await collection_roles.find().sort({ _id: -1 }).limit(1).toArray();

        if (lastRecord.length > 0) {
            last_id = Number(lastRecord[0].id);
            last_id = last_id + 1;
        } else {
            last_id = 1;
        }
        const newRoles = ({
            id: last_id,
            name_roles: parsedParams.name_roles
        });

        await collection_roles.insertOne(newRoles);
        return last_id
    }
    catch(error){
        console.log(`Произошла ошибка в CreateRoles: ${error}`)
        return error
    }
}

export default CreateRoles;