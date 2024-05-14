import { giveAllUsersTable } from '../models/giveAllUsers'

export async function giveAllUsers () {
    try {
        interface UserData {}
        
        const accounts: any[] = await giveAllUsersTable();
        
        let usersData = {
            data: [] as UserData[],
            total: 0
        };
    
        usersData.data.push(...accounts);
        usersData.total++;
        
        return usersData
    } 
    catch (error) {
        console.log(error)
        return false;
    }
};
export default giveAllUsers;