import { collection_requests, collection_mail } from '../index';

export async function giveMailTemplate(){
    try{
        const givedTemplate = await collection_mail.findOne({'id': 2});
        return givedTemplate;
    }
    catch(error){
        console.log(`В giveAllEmails.ts ${error}`)
        return false;
    }
}
export async function giveAllEmails() {
    try{
        const mail = await collection_requests.find().toArray();
        const checkedMail = mail.map(email => {
            const { _id, mail } = email;
            return mail;
        });
        return checkedMail;
    }
    catch(error){
        console.log(`В giveAllEmails.ts ${error}`)
        return false;
    }
}

export default giveAllEmails;