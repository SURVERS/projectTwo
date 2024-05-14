import { giveAllMailTable } from '../models/giveAllMail'

export async function giveAllMail () {
    try {
        interface UserData {}
        
        const mails: any[] = await giveAllMailTable();
        
        let mailData = {
            data: [] as UserData[],
            total: 0
        };
    
        mailData.data.push(...mails);
        mailData.total++;
        
        return mailData
    } 
    catch (error) {
        console.log(error)
        return false;
    }
};
export default giveAllMail;