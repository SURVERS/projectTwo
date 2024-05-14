"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var multer = require("multer");
var cron = require("node-cron");
var swaggerUi = require("swagger-ui-express");
var swaggerJsdoc = require("swagger-jsdoc");
var sendCheckUserData_1 = require("../controllers/sendCheckUserData");
var sendCheckUserToken_1 = require("../controllers/sendCheckUserToken");
var deleteSessionFromUser_1 = require("../controllers/deleteSessionFromUser");
var sendCheckRoles_1 = require("../controllers/sendCheckRoles");
var sendGiveAllUsers_1 = require("../controllers/sendGiveAllUsers");
var sendUpdateAccount_1 = require("../controllers/sendUpdateAccount");
var sendUpdateTemplates_1 = require("../controllers/sendUpdateTemplates");
var sendDeleteTemplates_1 = require("../controllers/sendDeleteTemplates");
var sendRequestController_1 = require("../controllers/sendRequestController");
var sendDeleteNews_1 = require("../controllers/sendDeleteNews");
var sendDeleteRoles_1 = require("../controllers/sendDeleteRoles");
var sendUpdateNews_1 = require("../controllers/sendUpdateNews");
var sendUpdateRoles_1 = require("../controllers/sendUpdateRoles");
var sendCreateNews_1 = require("../controllers/sendCreateNews");
var sendCreateRoles_1 = require("../controllers/sendCreateRoles");
var sendCreateMail_1 = require("../controllers/sendCreateMail");
var sendGiveAllMail_1 = require("../controllers/sendGiveAllMail");
var sendGiveAllNews_1 = require("../controllers/sendGiveAllNews");
var sendGiveUsers_1 = require("../controllers/sendGiveUsers");
var sendGiveNews_1 = require("../controllers/sendGiveNews");
var sendGiveRoles_1 = require("../controllers/sendGiveRoles");
var sendGiveAllRoles_1 = require("../controllers/sendGiveAllRoles");
var sendGiveAllRequests_1 = require("../controllers/sendGiveAllRequests");
var getImageForNews_1 = require("../controllers/getImageForNews");
var sendGetNewIDNews_1 = require("../controllers/sendGetNewIDNews");
var sendEmail_1 = require("../controllers/sendEmail");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/'); // Папка, куда будут сохраняться загруженные файлы
    },
    filename: function (req, file, cb) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("> ".concat(file));
                    _a = cb;
                    _b = [null];
                    return [4 /*yield*/, (0, sendGetNewIDNews_1.sendGetNewIDNews)()];
                case 1:
                    _a.apply(void 0, _b.concat([(_c.sent()) + '-' + file.originalname])); // Имя файла после сохранения
                    return [2 /*return*/];
            }
        });
    }); }
});
var upload = multer({ storage: storage });
cron.schedule('0 0 * * *', function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, sendEmail_1.sendEmail)()];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log('В cron произошла ошибка: ' + error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
var router = express.Router();
var options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API документация',
            version: '1.0.0',
        },
    },
    apis: ['./routes/routes.ts'],
};
var specs = swaggerJsdoc(options);
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
router.post('/send-email', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, sendEmail_1.sendEmail)()];
            case 1:
                result = _a.sent();
                result ? res.json('На все электронные почты отправились письма успешно!') : res.status(500).json('Произошла ошибка при отправке писем!');
                return [2 /*return*/];
        }
    });
}); });
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
router.get('/undefined/api/Requests', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('request: 5');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, sendGiveAllRequests_1.giveAllRequests)()];
            case 2:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(401).send(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
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
router.post('/undefined/api/Roles/create', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, newsData, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('request: 1');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, sendRequestController_1.sendRequest)('88005553535', 'Ирина', 'delevoper2@mail.ru', '/undefined/api/Roles/create')];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, sendCreateRoles_1.sendCreateRoles)(req.body.body)];
            case 3:
                result = _a.sent();
                newsData = { id: Number(result) };
                res.json(newsData);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.log("\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u0432 router.ts (router/create): ".concat(error_3));
                res.status(401).send(error_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
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
router.delete('/undefined/api/Roles', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newsData, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('request: 2');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, sendDeleteRoles_1.sendDeleteRoles)(req.body.ids)];
            case 2:
                _a.sent();
                newsData = { id: req.body.ids };
                res.json(newsData);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(401).send(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
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
router.post('/undefined/api/Roles/:id/update', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ids, newsData, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('request: 3');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, sendRequestController_1.sendRequest)('88005553535', 'Дима', 'delevoper2@mail.ru', "/undefined/api/Roles/".concat(req.params.id, "/update"))];
            case 2:
                _a.sent();
                ids = req.params.id;
                return [4 /*yield*/, (0, sendUpdateRoles_1.sendUpdateRoles)(req.body.body, ids)];
            case 3:
                _a.sent();
                newsData = { id: 1 };
                res.json(newsData);
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                res.status(401).send(error_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
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
router.get('/undefined/api/Roles/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('request: 4');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, (0, sendGiveRoles_1.giveRoles)(id)];
            case 2:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                res.status(401).send(error_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
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
router.get('/undefined/api/Roles', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('request: 5');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, sendGiveAllRoles_1.giveAllRoles)()];
            case 2:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                res.status(401).send(error_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
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
router.post('/undefined/api/News/load_image', upload.single('image'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('request: 1');
        try {
            if (req.file) {
                res.send('File uploaded!');
            }
            else {
                res.status(400).send('No file uploaded.');
            }
        }
        catch (error) {
            console.log("\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u0432 router.ts (news/create): ".concat(error));
            res.status(401).send(error);
        }
        return [2 /*return*/];
    });
}); });
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
router.post('/undefined/api/News/create', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, newsData, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('request: 1');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, sendRequestController_1.sendRequest)('88005553535', 'Ксения', 'delevoper2@mail.ru', '/undefined/api/News/create')];
            case 2:
                _a.sent();
                console.log(req.body.body);
                return [4 /*yield*/, (0, sendCreateNews_1.sendCreateNews)(req.body.body)];
            case 3:
                result = _a.sent();
                newsData = { id: Number(result) };
                res.json(newsData);
                return [3 /*break*/, 5];
            case 4:
                error_8 = _a.sent();
                console.log("\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u0432 router.ts (news/create): ".concat(error_8));
                res.status(401).send(error_8);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
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
router.delete('/undefined/api/News', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newsData, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('request: 2');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, sendDeleteNews_1.sendDeleteNews)(req.body.ids)];
            case 2:
                _a.sent();
                newsData = { id: 1 };
                res.json(newsData);
                return [3 /*break*/, 4];
            case 3:
                error_9 = _a.sent();
                res.status(401).send(error_9);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
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
router.post('/undefined/api/News/:id/update', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ids, newsData, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('request: 3');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, sendRequestController_1.sendRequest)('88005553535', 'Денис', 'delevoper2@mail.ru', "/undefined/api/News/".concat(req.params.id, "/update"))];
            case 2:
                _a.sent();
                ids = req.params.id;
                return [4 /*yield*/, (0, sendUpdateNews_1.sendUpdateNews)(req.body.body, ids)];
            case 3:
                _a.sent();
                newsData = { id: 1 };
                res.json(newsData);
                return [3 /*break*/, 5];
            case 4:
                error_10 = _a.sent();
                res.status(401).send(error_10);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
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
router.get('/undefined/api/News/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('request: 4');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, (0, sendGiveNews_1.giveNews)(id)];
            case 2:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                error_11 = _a.sent();
                res.status(401).send(error_11);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
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
router.get('/undefined/api/News', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('request: 5');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, sendGiveAllNews_1.giveAllNews)(req.query)];
            case 2:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                error_12 = _a.sent();
                res.status(401).send(error_12);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
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
router.post('/undefined/api/Mail%20Templates/create', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, newsData, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('request: 1');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, sendRequestController_1.sendRequest)('88005553535', 'Ирина', 'delevoper2@mail.ru', '/undefined/api/Mail%20Templates/create')];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, sendCreateMail_1.sendCreateMail)(req.body.body)];
            case 3:
                result = _a.sent();
                newsData = { id: Number(result) };
                res.json(newsData);
                return [3 /*break*/, 5];
            case 4:
                error_13 = _a.sent();
                console.log("\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u0432 router.ts (router/create): ".concat(error_13));
                res.status(401).send(error_13);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
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
router.delete('/undefined/api/Mail%20Templates', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mailData, error_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, sendDeleteTemplates_1.sendDeleteTemplates)(req.body.ids)];
            case 1:
                _a.sent();
                mailData = {
                    id: 1
                };
                res.json(mailData);
                return [3 /*break*/, 3];
            case 2:
                error_14 = _a.sent();
                res.status(401).send(error_14);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
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
router.post('/undefined/api/Mail%20Templates/:id/update', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ids, mailData, error_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, sendRequestController_1.sendRequest)('88005553535', 'Даша', 'delevoper2@mail.ru', "/undefined/api/Mail%20Templates/".concat(req.params.id, "/update"))];
            case 1:
                _a.sent();
                ids = req.params.id;
                return [4 /*yield*/, (0, sendUpdateTemplates_1.sendUpdateTemplates)(req.body.body, ids)];
            case 2:
                _a.sent();
                mailData = {
                    id: parseInt(ids)
                };
                res.json(mailData);
                return [3 /*break*/, 4];
            case 3:
                error_15 = _a.sent();
                res.status(401).send(error_15);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
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
router.get('/undefined/api/Mail%20Templates/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, mailData;
    return __generator(this, function (_a) {
        try {
            id = req.params.id;
            mailData = {
                id: parseInt(id)
            };
            res.json(mailData);
        }
        catch (error) {
            res.status(401).send(error);
        }
        return [2 /*return*/];
    });
}); });
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
router.get('/undefined/api/Mail%20Templates', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_16;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, sendGiveAllMail_1.giveAllMail)()];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_16 = _a.sent();
                res.status(401).send(error_16);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
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
router.patch('/undefined/api/Users/:id/:params', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, params, result, updateData, error_17;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                params = req.params.params;
                return [4 /*yield*/, (0, sendUpdateAccount_1.sendUpdateAccount)(params, id)];
            case 1:
                result = _a.sent();
                if (result === true) {
                    updateData = { id: 1 };
                    res.json(updateData);
                }
                else {
                    res.json(result);
                }
                return [3 /*break*/, 3];
            case 2:
                error_17 = _a.sent();
                res.status(401).send(error_17);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
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
router.get('/undefined/api/Users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, error_18;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, (0, sendGiveUsers_1.giveUsers)(id)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_18 = _a.sent();
                res.status(401).send(error_18);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
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
router.get('/undefined/api/Users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_19;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, sendGiveAllUsers_1.giveAllUsers)()];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_19 = _a.sent();
                res.status(401).send(error_19);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
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
router.post('/api/user/checkRoles/:token', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_20;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, sendRequestController_1.sendRequest)('88005553535', 'Ирина', 'delevoper2@mail.ru', "/api/user/checkRoles/".concat(req.params.token))];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, sendCheckRoles_1.verifyTokenRoles)(req.params.token)];
            case 2:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                error_20 = _a.sent();
                res.status(401).send(error_20);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
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
router.post('/api/auth/check_auth/:login/:password', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_21;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, sendRequestController_1.sendRequest)('88005553535', 'Ирина', 'delevoper2@mail.ru', "/api/auth/check_auth/".concat(req.params.login, "/*********"))];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, sendCheckUserData_1.sendCheckUserData)(req.params.login, req.params.password)];
            case 2:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                error_21 = _a.sent();
                res.status(401).send('Данный аккаунт не найден/или неверный пароль');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
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
router.post('/api/auth/checkSession/:token', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_22;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, sendRequestController_1.sendRequest)('88005553535', 'Ирина', 'delevoper2@mail.ru', "/api/auth/checkSession/".concat(req.params.token))];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, sendCheckUserToken_1.verifyToken)(req.params.token)];
            case 2:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                error_22 = _a.sent();
                res.status(401).send(error_22);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
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
router.post('/api/auth/deleteSession/:token', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_23;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, sendRequestController_1.sendRequest)('88005553535', 'Ирина', 'delevoper2@mail.ru', "/api/auth/deleteSession/".concat(req.params.token))];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, deleteSessionFromUser_1.deleteSession)(req.params.token)];
            case 2:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                error_23 = _a.sent();
                res.status(401).send(error_23);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
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
router.get('/api/img/news/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_24;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, sendRequestController_1.sendRequest)('88005553535', 'Ирина', 'delevoper2@mail.ru', "/api/img/news/".concat(req.params.id))];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, getImageForNews_1.getImageForNews)(req.params.id)];
            case 2:
                result = _a.sent();
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(result);
                return [3 /*break*/, 4];
            case 3:
                error_24 = _a.sent();
                res.status(401).send(error_24);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
