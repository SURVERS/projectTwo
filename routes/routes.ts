import * as express from 'express';
import * as multer from 'multer';
import * as cron from 'node-cron';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJsdoc from 'swagger-jsdoc';

import { Request, Response } from 'express'
import { sendCheckUserData } from '../controllers/sendCheckUserData'
import { verifyToken } from '../controllers/sendCheckUserToken'
import { deleteSession } from '../controllers/deleteSessionFromUser'
import { verifyTokenRoles } from '../controllers/sendCheckRoles'
import { giveAllUsers } from '../controllers/sendGiveAllUsers'
import { sendUpdateAccount } from '../controllers/sendUpdateAccount'
import { sendUpdateTemplates } from '../controllers/sendUpdateTemplates'
import { sendDeleteTemplates } from '../controllers/sendDeleteTemplates'
import { sendRequest } from '../controllers/sendRequestController'
import { sendDeleteNews } from '../controllers/sendDeleteNews'
import { sendDeleteRoles } from '../controllers/sendDeleteRoles'
import { sendUpdateNews } from '../controllers/sendUpdateNews'
import { sendUpdateRoles } from '../controllers/sendUpdateRoles'
import { sendCreateNews } from '../controllers/sendCreateNews'
import { sendCreateRoles } from '../controllers/sendCreateRoles'
import { sendCreateMail } from '../controllers/sendCreateMail'
import { giveAllMail } from '../controllers/sendGiveAllMail'
import { giveAllNews } from '../controllers/sendGiveAllNews'
import { giveUsers } from '../controllers/sendGiveUsers'
import { giveNews } from '../controllers/sendGiveNews'
import { giveRoles } from '../controllers/sendGiveRoles'
import { giveAllRoles } from '../controllers/sendGiveAllRoles'
import { giveAllRequests } from '../controllers/sendGiveAllRequests'
import { getImageForNews } from '../controllers/getImageForNews'
import { sendGetNewIDNews } from '../controllers/sendGetNewIDNews'

import { sendEmail } from '../controllers/sendEmail'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/'); // Папка, куда будут сохраняться загруженные файлы
    },
    filename: async (req, file, cb) => {
        console.log(`> ${file}`)
        cb(null, await sendGetNewIDNews() + '-' + file.originalname); // Имя файла после сохранения
    }
});
const upload = multer({ storage: storage });
cron.schedule('0 0 * * *', async () => {
    try{
        await sendEmail()
    }
    catch(error){
        console.log('В cron произошла ошибка: ' + error)
    }
});
const router = express.Router();
type PaginationParams = {
    pagination: {
        page: string;
        perPage: string;
    };
    sort: {
        field: string;
        order: string;
    };
}
interface CustomParams extends PaginationParams {
    id: string;
}

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API документация',
        version: '1.0.0',
      },
    },
    apis: ['./routes/routes.ts'],
};
const specs = swaggerJsdoc(options);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
/**
 * @swagger
 * /send-email:
 *   post:
 *     summary: Отправка писем из Requests
 *     responses:
 *       '200':
 *         description: 'Все письма отправились успешно.'
 *       '500':
 *         description: 'Произошла ошибка при отправке писем!'
*/
router.post('/send-email', async (req: Request, res: Response) => {
    const result = await sendEmail()
    result ? res.json('На все электронные почты отправились письма успешно!') : res.status(500).json('Произошла ошибка при отправке писем!')
});
/**
 * @swagger
 * /undefined/api/Requests:
 *   get:
 *     summary: Раздел Requests в React-Admin
 *     responses:
 *       '200':
 *         description: 'Успешно отправился ответ в React-Admin'
 *       '401':
 *         description: 'Произошла ошибка при отправке запроса в бд mongodb, для получение всех requests!'
*/
router.get('/undefined/api/Requests', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    console.log('request: 5')
    try{
        const result = await giveAllRequests()
        res.json(result);
    }
    catch(error){
        res.status(401).send(error)
    }
})
/**
 * @swagger
 * /undefined/api/Roles/create:
 *   post:
 *     summary: Создание роли в разделе Roles в React-Admin
 *     responses:
 *       '200':
 *         description: 'Роль успешно создана'
 *       '401':
 *         description: 'Произошла ошибка при создание роли. Возможно запрос в базу даннных не был отправлен.'
*/
router.post('/undefined/api/Roles/create', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    console.log('request: 1')
    try {
        await sendRequest('88005553535', 'Ирина', 'delevoper2@mail.ru', '/undefined/api/Roles/create')
        const result = await sendCreateRoles(req.body.body)
        let newsData = {id: Number(result)};
        res.json(newsData);
    } catch (error) {
        console.log(`Произошла ошибка в router.ts (router/create): ${error}`)
        res.status(401).send(error);
    }
})
/**
 * @swagger
 * /undefined/api/Roles:
 *   delete:
 *     summary: Удаление ролей в React-Admin
 *     responses:
 *       '200':
 *         description: 'Роль/Роли были успешно удалены!'
 *       '401':
 *         description: 'Произошла ошибка при удаление ролей. Возможно запрос в базу даннных не был отправлен.'
*/
router.delete('/undefined/api/Roles', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    console.log('request: 2')
    try {
        await sendDeleteRoles(req.body.ids)
        let newsData = {id: req.body.ids};
        res.json(newsData);
    } catch (error) {
        res.status(401).send(error);
    }
})
/**
 * @swagger
 * /undefined/api/Roles/:id/update:
 *   post:
 *     summary: >
 *       Обновление значений в таблице внутри коллекции Roles в React-Admin. ID: id таблицы
 *     responses:
 *       '200':
 *         description: 'Значение было(и) обновлено(ы)'
 *       '401':
 *         description: 'Произошла ошибка при обновление ролей. Возможно запрос в базу данных не был отправлен.'
*/
router.post('/undefined/api/Roles/:id/update', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    console.log('request: 3')
    try {
        await sendRequest('88005553535', 'Дима', 'delevoper2@mail.ru', `/undefined/api/Roles/${req.params.id}/update`)
        const ids = req.params.id;
        await sendUpdateRoles(req.body.body, ids)
        let newsData = {id: 1};
        res.json(newsData);
    } catch (error) {
        res.status(401).send(error);
    }
})
/**
 * @swagger
 * /undefined/api/Roles/:id:
 *   get:
 *     summary: >
 *        Получение определенной таблицы по ID в React-Admin. ID: id таблицы
 *     responses:
 *       '200':
 *         description: 'Успешно получена таблица по id'
 *       '401':
 *         description: 'Произошла ошибка при получение таблицы. Возможно запрос в базу даннных не был отправлен.'
*/
router.get('/undefined/api/Roles/:id', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    console.log('request: 4')
    try {
        const id = req.params.id;
        const result = await giveRoles(id)
        res.json(result);
    } catch (error) {
        res.status(401).send(error);
    }
})
/**
 * @swagger
 * /undefined/api/Roles:
 *   get:
 *     summary: Получение всех таблиц из Ролей в React-Admin.
 *     responses:
 *       '200':
 *         description: 'Успешно получены все таблицы'
 *       '401':
 *         description: 'Произошла ошибка при получение таблиц. Возможно запрос в базу даннных не был отправлен.'
*/
router.get('/undefined/api/Roles', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    console.log('request: 5')
    try{
        const result = await giveAllRoles()
        res.json(result);
    }
    catch(error){
        res.status(401).send(error)
    }
})
/**
 * @swagger
 * /undefined/api/News/load_image:
 *   post:
 *     summary: Данный эндпоинт отвечает за загрузку изображения на сервер в папку Images.
 *     responses:
 *       '200':
 *         description: 'Успешно загружено изображение'
 *       '401':
 *         description: 'Произошла ошибка при загрузке изображения. Возможно папки Images не существует.'
*/
router.post('/undefined/api/News/load_image', upload.single('image'), async (req, res) => {
    console.log('request: 1')
    try {
        if (req.file) {
            res.send('File uploaded!');
        } else {
            res.status(400).send('No file uploaded.');
        }
    } catch (error) {
        console.log(`Произошла ошибка в router.ts (news/create): ${error}`)
        res.status(401).send(error);
    }
})
/**
 * @swagger
 * /undefined/api/News/create:
 *   post:
 *     summary: Создание новости в разделе News в React-Admin
 *     responses:
 *       '200':
 *         description: 'Новость успешно создана'
 *       '401':
 *         description: 'Произошла ошибка при создание новости. Возможно запрос в базу даннных не был отправлен.'
*/
router.post('/undefined/api/News/create', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    console.log('request: 1')
    try {
        await sendRequest('88005553535', 'Ксения', 'delevoper2@mail.ru', '/undefined/api/News/create')
        console.log(req.body.body)
        const result = await sendCreateNews(req.body.body)
        let newsData = {id: Number(result)};
        res.json(newsData);
    } catch (error) {
        console.log(`Произошла ошибка в router.ts (news/create): ${error}`)
        res.status(401).send(error);
    }
})
/**
 * @swagger
 * /undefined/api/News:
 *   delete:
 *     summary: Удаление новостей в React-Admin
 *     responses:
 *       '200':
 *         description: 'Новость(и) успешно удалена(ы)'
 *       '401':
 *         description: 'Произошла ошибка при удаление новости(ей). Возможно запрос в базу даннных не был отправлен.'
*/
router.delete('/undefined/api/News', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    console.log('request: 2')
    try {
        await sendDeleteNews(req.body.ids)
        let newsData = {id: 1};
        res.json(newsData);
    } catch (error) {
        res.status(401).send(error);
    }
})
/**
 * @swagger
 * /undefined/api/News/:id/update:
 *   post:
 *     summary: Обновление новости по ID в React-Admin.
 *     responses:
 *       '200':
 *         description: 'Новость успешно обновлена'
 *       '401':
 *         description: 'Произошла ошибка при обнновление новости. Возможно запрос в базу даннных не был отправлен.'
*/
router.post('/undefined/api/News/:id/update', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    console.log('request: 3')
    try {
        await sendRequest('88005553535', 'Денис', 'delevoper2@mail.ru', `/undefined/api/News/${req.params.id}/update`)
        const ids = req.params.id;
        await sendUpdateNews(req.body.body, ids)
        let newsData = {id: 1};
        res.json(newsData);
    } catch (error) {
        res.status(401).send(error);
    }
})
/**
 * @swagger
 * /undefined/api/News/:id:
 *   get:
 *     summary: Полученние новости по ID в React-Admin.
 *     responses:
 *       '200':
 *         description: 'Новость успешно получена'
 *       '401':
 *         description: 'Произошла ошибка при получение новости по ID. Возможно запрос в базу даннных не был отправлен.'
*/
router.get('/undefined/api/News/:id', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    console.log('request: 4')
    try {
        const id = req.params.id;
        const result = await giveNews(id)
        res.json(result);
    } catch (error) {
        res.status(401).send(error);
    }
})
/**
 * @swagger
 * /undefined/api/News:
 *   get:
 *     summary: Полученние всех новостей в React-Admin.
 *     responses:
 *       '200':
 *         description: 'Новости успешно получены'
 *       '401':
 *         description: 'Произошла ошибка при получение всех новостей. Возможно запрос в базу даннных не был отправлен.'
*/
router.get('/undefined/api/News', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    console.log('request: 5')
    try{
        const result = await giveAllNews(req.query)
        res.json(result);
    }
    catch(error){
        res.status(401).send(error)
    }
})
/**
 * @swagger
 * /undefined/api/Mail%20Templates/create:
 *   post:
 *     summary: Создание шаблона письма в React-Admin.
 *     responses:
 *       '200':
 *         description: 'Шаблон письма успешно создан'
 *       '401':
 *         description: 'Произошла ошибка при создание шаблона. Возможно запрос в базу даннных не был отправлен.'
*/
router.post('/undefined/api/Mail%20Templates/create', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    console.log('request: 1')
    try {
        await sendRequest('88005553535', 'Ирина', 'delevoper2@mail.ru', '/undefined/api/Mail%20Templates/create')
        const result = await sendCreateMail(req.body.body)
        let newsData = {id: Number(result)};
        res.json(newsData);
    } catch (error) {
        console.log(`Произошла ошибка в router.ts (router/create): ${error}`)
        res.status(401).send(error);
    }
})
/**
 * @swagger
 * /undefined/api/Mail%20Templates:
 *   delete:
 *     summary: Удаление шаблона письма в React-Admin.
 *     responses:
 *       '200':
 *         description: 'Шаблон письма успешно удален'
 *       '401':
 *         description: 'Произошла ошибка при удаление шаблона. Возможно запрос в базу даннных не был отправлен.'
*/
router.delete('/undefined/api/Mail%20Templates', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    try {
        await sendDeleteTemplates(req.body.ids)
        let mailData = {
            id: 1
        };
        res.json(mailData);
    } catch (error) {
        res.status(401).send(error);
    }
})
/**
 * @swagger
 * /undefined/api/Mail%20Templates/:id/update:
 *   post:
 *     summary: Обновление шаблона письма по ID в React-Admin.
 *     responses:
 *       '200':
 *         description: 'Шаблон письма по ID успешно обновлен'
 *       '401':
 *         description: 'Произошла ошибка при обновление шаблона. Возможно запрос в базу даннных не был отправлен.'
*/
router.post('/undefined/api/Mail%20Templates/:id/update', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    try {
        await sendRequest('88005553535', 'Даша', 'delevoper2@mail.ru', `/undefined/api/Mail%20Templates/${req.params.id}/update`)
        const ids = req.params.id;
        await sendUpdateTemplates(req.body.body, ids)
        let mailData = {
            id: parseInt(ids)
        };
        res.json(mailData);
    } catch (error) {
        res.status(401).send(error);
    }
})
/**
 * @swagger
 * /undefined/api/Mail%20Templates/:id:
 *   get:
 *     summary: Получение шаблона письма по ID в React-Admin.
 *     responses:
 *       '200':
 *         description: 'Шаблон письма по ID успешно получен'
 *       '401':
 *         description: 'Произошла ошибка при получение шаблона. Возможно запрос в базу даннных не был отправлен.'
*/
router.get('/undefined/api/Mail%20Templates/:id', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    try {
        const id = req.params.id;
        let mailData = {
            id: parseInt(id)
        };
        res.json(mailData);
    } catch (error) {
        res.status(401).send(error);
    }
})
/**
 * @swagger
 * /undefined/api/Mail%20Templates:
 *   get:
 *     summary: Получение всех шаблонов в React-Admin.
 *     responses:
 *       '200':
 *         description: 'Шаблоны писем успешно получены'
 *       '401':
 *         description: 'Произошла ошибка при получение шаблонов. Возможно запрос в базу даннных не был отправлен.'
*/
router.get('/undefined/api/Mail%20Templates', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    try{
        const result = await giveAllMail()
        res.json(result);
    }
    catch(error){
        res.status(401).send(error)
    }
})
/**
 * @swagger
 * /undefined/api/Users/:id/:params:
 *   patch:
 *     summary: Обновление данных пользователя по ID и Params в React-Admin.
 *     responses:
 *       '200':
 *         description: 'Обновление данных пользователя по его ID успешно!'
 *       '401':
 *         description: 'Произошла ошибка при обновление данных пользователя. Возможно запрос в базу даннных не был отправлен.'
*/
router.patch('/undefined/api/Users/:id/:params', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    try {
        const id = req.params.id;
        const params = req.params.params;
        const result = await sendUpdateAccount(params, id)
        if (result === true){
            const updateData = {id: 1};
            res.json(updateData)
        }
        else{
            res.json(result)
        }
    } catch (error) {
        res.status(401).send(error);
    }
})
/**
 * @swagger
 * /undefined/api/Users/:id:
 *   get:
 *     summary: Получение данных пользователя по его ID в React-Admin.
 *     responses:
 *       '200':
 *         description: 'Получение данных пользователя по его ID успешно!'
 *       '401':
 *         description: 'Произошла ошибка при получение данных пользователя. Возможно запрос в базу даннных не был отправлен.'
*/
router.get('/undefined/api/Users/:id', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    try {
        const id = req.params.id;
        const result = await giveUsers(id)
        res.json(result);
    } catch (error) {
        res.status(401).send(error);
    }
})
/**
 * @swagger
 * /undefined/api/Users:
 *   get:
 *     summary: Получение данных пользователей в React-Admin.
 *     responses:
 *       '200':
 *         description: 'Получение данных пользователей успешно!'
 *       '401':
 *         description: 'Произошла ошибка при получение данных пользователей. Возможно запрос в базу даннных не был отправлен.'
*/
router.get('/undefined/api/Users', async (req: Request<any, any, any, CustomParams>, res: Response) => {
    try{
        const result = await giveAllUsers()
        res.json(result);
    }
    catch(error){
        res.status(401).send(error)
    }
})
/**
 * @swagger
 * /api/user/checkRoles/:token:
 *   post:
 *     summary: Получение роли пользователя по его token.
 *     responses:
 *       '200':
 *         description: 'Успешно получена роль пользователя!'
 *       '401':
 *         description: 'Произошла ошибка при получение роли пользователя. Возможно запрос в базу даннных не был отправлен.'
*/
router.post('/api/user/checkRoles/:token', async (req:Request, res: Response) => {
    try{
        await sendRequest('88005553535', 'Ирина', 'delevoper2@mail.ru', `/api/user/checkRoles/${req.params.token}`)
        const result = await verifyTokenRoles(req.params.token)
        res.send(result)
    }
    catch(error){
        res.status(401).send(error)
    }
})
/**
 * @swagger
 * /api/auth/check_auth/:login/:password:
 *   post:
 *     summary: Проверка на валидность логина и пароля пользователя.
 *     responses:
 *       '200':
 *         description: 'Успешно!'
 *       '401':
 *         description: 'Произошла ошибка при проверке данных пользователя. Возможно запрос в базу даннных не был отправлен или же неверный логин/пароль'
*/
router.post('/api/auth/check_auth/:login/:password', async (req:Request, res: Response) => {
    try{
        await sendRequest('88005553535', 'Ирина', 'delevoper2@mail.ru', `/api/auth/check_auth/${req.params.login}/*********`)
        const result = await sendCheckUserData(req.params.login, req.params.password)
        res.send(result)
    }
    catch(error){
        res.status(401).send('Данный аккаунт не найден/или неверный пароль')
    }
})
/**
 * @swagger
 * /api/auth/checkSession/:token:
 *   post:
 *     summary: Проверка на наличие сессии.
 *     responses:
 *       '200':
 *         description: 'Успешно!'
 *       '401':
 *         description: 'Произошла ошибка при проверке сессии пользователя. Возможно запрос в базу даннных не был отправлен'
*/
router.post('/api/auth/checkSession/:token', async (req:Request, res: Response) => {
    try{
        await sendRequest('88005553535', 'Ирина', 'delevoper2@mail.ru', `/api/auth/checkSession/${req.params.token}`)
        const result = await verifyToken(req.params.token)
        res.send(result)
    }
    catch(error){
        res.status(401).send(error)
    }
})
/**
 * @swagger
 * /api/auth/deleteSession/:token:
 *   post:
 *     summary: Удаление сессии по токену.
 *     responses:
 *       '200':
 *         description: 'Успешно!'
 *       '401':
 *         description: 'Произошла ошибка при удаление сессии пользователя. Возможно запрос в базу даннных не был отправлен'
*/
router.post('/api/auth/deleteSession/:token', async (req:Request, res: Response) => {
    try{
        await sendRequest('88005553535', 'Ирина', 'delevoper2@mail.ru', `/api/auth/deleteSession/${req.params.token}`)
        const result = await deleteSession(req.params.token)
        res.send(result)
    }
    catch(error){
        res.status(401).send(error)
    }
})
/**
 * @swagger
 * '/api/img/news/:id':
 *   post:
 *     summary: Получение изображения по его ID.
 *     responses:
 *       '200':
 *         description: 'Успешно!'
 *       '401':
 *         description: 'Произошла ошибка при получении изображения по ID. Возможно запрос в базу данных не был отправлен.'
 */
router.get('/api/img/news/:id', async (req:Request, res: Response) => {
    try{
        await sendRequest('88005553535', 'Ирина', 'delevoper2@mail.ru', `/api/img/news/${req.params.id}`)
        const result = await getImageForNews(req.params.id)
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(result);
    }
    catch(error){
        res.status(401).send(error)
    }
})

export default router;