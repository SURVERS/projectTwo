import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';
import { giveAllEmails, giveMailTemplate } from '../models/giveAllEmails'
import { resolve } from 'path';

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'delevoper@inbox.ru',
        pass: 'XyeQXcKahyKd1sJCx48B'
    }
});

export async function sendEmail(){
    const recipients = await giveAllEmails()
    const templateAndName = await giveMailTemplate()
    
    try{
        const results: SentMessageInfo[] = [];

        for (const recipient of recipients){
            const mailOptions = {
                from: 'delevoper@inbox.ru',
                to: recipient,
                subject: templateAndName.name,
                html: templateAndName.template
            };
        
            const result: SentMessageInfo = await transporter.sendMail(mailOptions);
            results.push(result);
        }

        console.log('Все письма успешно отправлены');
        return true
    }
    catch(error){
        console.log(error);
        return false
    }
}