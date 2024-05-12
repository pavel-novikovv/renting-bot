const TelegramApi = require('node-telegram-bot-api');

const TELEGRAM_TOKEN = '7023390468:AAHAqROUHJcrebbsgZeauNiDuExN8Tp0pD8';
const bot = new TelegramApi(TELEGRAM_TOKEN, { polling: true });

const apartmentsData = {
    'Приволжский': {
        'Однокомнатная': [
            {
                photos: ['images/photo_1_1.jpg', 'images/photo_1_2.jpg', 'images/photo_1_3.jpg', 'images/photo_1_4.jpg', 'images/photo_1_5.jpg', 'images/photo_1_6.jpg', 'images/photo_1_7.jpg', 'images/photo_1_8.jpg', 'images/photo_1_9.jpg'],
                description: '📍 Адрес: Тульская улица 43А\n\n' +
                    'Уютная квартира с одной комнатой и кухней\n' +
                    '✅Техника и мебель, всё для проживания имеется. Магазины и остановка в 2-ух минутах от дома, в шaговoй доcтупнoсти остaнoвки обществeннoгo трaнcпopта\n\n' +
                    '💰 Цена 1000 руб/сутки',
                id: 1
            }
        ],
        'Двухкомнатная': [
            {
                photos: ['images/photo_5_1.jpg', 'images/photo_5_2.jpg', 'images/photo_5_3.jpg', 'images/photo_5_4.jpg', 'images/photo_5_5.jpg', 'images/photo_5_6.jpg', 'images/photo_5_7.jpg', 'images/photo_5_8.jpg'],
                description: '📍 Адрес: Арбузная улица 10\n\n' + 'Просторная квартира с двумя комнатами и балконом\n' +
                    '✅Имеется вся необходимая мебель и техника для проживания.\n' +
                    'Квартира уютная,с удобной планировкой,с большой кухней и с 2 санузлами. На кухне, в санузлах тёплые полы.\n\n' +
                    '💰 Цена 2300 руб/сутки',
                id: 3
            }
        ]
    },
    'Вахитовский': {
        'Однокомнатная': [
            {
                photos: ['images/photo_1_1.jpg', 'images/photo_1_2.jpg', 'images/photo_1_3.jpg', 'images/photo_1_4.jpg', 'images/photo_1_5.jpg', 'images/photo_1_6.jpg', 'images/photo_1_7.jpg', 'images/photo_1_8.jpg', 'images/photo_1_9.jpg'],
                description: '📍 Адрес: Улица Николавева 13\n\n' +
                    'Уютная квартира с одной комнатой и кухней' +
                    '✅ Есть все необходимое для комфортной жизни: печка, чайник, обогреватель, микроволновка, стиральная машина, рабочее место, спальное, большое место хранения, постельное белье, хорошая посуда, пару книжек, одеяла, подушки, застекленный балкон.\n\n' +
                    '💰 Цена 2100 руб/сутки',
                id: 10
            }
        ],
        'Двухкомнатная': [
            {
                photos: ['images/photo_6_1.jpg', 'images/photo_6_2.jpg', 'images/photo_6_3.jpg', 'images/photo_6_4.jpg', 'images/photo_6_5.jpg', 'images/photo_6_6.jpg', 'images/photo_6_7.jpg', 'images/photo_6_8.jpg'],
                description: '📍 Адрес: Ракетная улица 10\n\n' + 'Просторная квартира с двумя комнатами и балконом\n' +
                    '✅имеется стиральная машина,духовой шкаф ,варочная панель,двухспальная кровать,диван,шкаф для одежды.\n' +
                    'Квартира уютная,с удобной планировкой,с большой кухней и с 2 санузлами. На кухне, в санузлах тёплые полы.\n\n' +
                    '💰 Цена 3700 руб/сутки',
                id: 30
            }
        ]
    },
    'Московский': {
        'Однокомнатная': [
            {
                photos: ['images/photo_4_1.jpg', 'images/photo_4_2.jpg', 'images/photo_4_3.jpg', 'images/photo_4_4.jpg', 'images/photo_4_5.jpg', 'images/photo_4_6.jpg'],
                description: '📍 Адрес: Улица Корбенова 32\n\n' +
                    'Уютная квартира с одной комнатой и кухней\n' +
                    '✅имеется стиральная машина,духовой шкаф ,варочная панель,двухспальная кровать,диван,шкаф для одежды\n\n' +
                    '💰 Цена 1500 руб/сутки',
                id: 111
            }
        ],
        'Двухкомнатная': [
            {
                photos: ['images/photo_5_1.jpg', 'images/photo_5_2.jpg', 'images/photo_5_3.jpg', 'images/photo_5_4.jpg', 'images/photo_5_5.jpg', 'images/photo_5_6.jpg', 'images/photo_5_7.jpg', 'images/photo_5_8.jpg'],
                description: '📍 Адрес: Арбузная улица 10\n\n' + 'Просторная квартира с двумя комнатами и балконом\n' +
                    '✅имеется стиральная машина,духовой шкаф ,варочная панель,двухспальная кровать,диван,шкаф для одежды.\n' +
                    'Квартира уютная,с удобной планировкой,с большой кухней и с 2 санузлами. На кухне, в санузлах тёплые полы.\n\n' +
                    '💰 Цена 3300 руб/сутки',
                id: 99
            }
        ]
    }
};

const userState = {};

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    userState[chatId]=chatId;
    // Отправляем основное меню
    sendMainMenu(chatId);

    console.log(userState)
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Обработка основного меню
    switch (text) {
        case 'Выбор района':
            // Отправляем меню выбора района
            sendDistrictMenu(chatId);
            break;

        case 'Назад':
            sendMainMenu(chatId);
            break;

        case 'Информация об арендодателе':
            // Отправляем информацию об арендодателе
            sendLandlordInfo(chatId);
            break;

        case 'Приволжский':
        case 'Вахитовский':
        case 'Московский':
            // Обрабатываем выбор района
            handleDistrictChoice(chatId, text);
            break;

        case 'Однокомнатная':
        case 'Двухкомнатная':
            handleRoomTypeChoice(chatId, text);
            break;

        case 'Забронировать':
            handleBooking(chatId);
            break;
    }
});


// Функция для отправки основного меню
function sendMainMenu(chatId) {

    console.log('sendMainMenu')

    bot.sendMessage(chatId, 'Выберите действие:', {
        reply_markup: {
            keyboard: [
                ['Выбор района', 'Информация об арендодателе']
            ],
            resize_keyboard: true
        }
    });
}

// Функция для отправки меню выбора района
function sendDistrictMenu(chatId) {

    console.log('sendDistrictMenu')
    console.log(userState)

    bot.sendMessage(chatId, 'Выберите район:', {
        reply_markup: {
            keyboard: [
                ['Приволжский', 'Вахитовский', 'Московский'],
                ['Назад']
            ],
            resize_keyboard: true
        }
    });
}

function sendBookingMenu(chatId) {

    console.log('sendRoomTypeMenu')

    bot.sendMessage(chatId, 'Хотите забронировать эту квартиру?', {
        reply_markup: {
            keyboard: [
                ['Забронировать'],
                ['Назад']
            ],
            resize_keyboard: true
        }
    });
}

// Функция для отправки меню выбора количества комнат
function sendRoomTypeMenu(chatId) {

    console.log('sendRoomTypeMenu')

    bot.sendMessage(chatId, 'Выберите количество комнат:', {
        reply_markup: {
            keyboard: [
                ['Однокомнатная', 'Двухкомнатная'],
                ['Назад']
            ],
            resize_keyboard: true
        }
    });
}


function updateUserStateDistrict(chatId, type) {
    // Создаем или обновляем запись для данного пользователя
    userState[chatId] = {
        district: type
    };
}


function updateUserStateRoomType(chatId, type) {
    // Создаем или обновляем запись для данного пользователя
    userState[chatId].roomType = type;
}

// Функция для обработки выбора района
function handleDistrictChoice(chatId, district) {
    console.log('handleDistrictChoice')

    // Отправляем меню выбора количества комнат
    sendRoomTypeMenu(chatId);
    // Сохраняем выбранный район в состоянии пользователя
    updateUserStateDistrict(chatId, district);
    console.log(userState);
}


function handleRoomTypeChoice(chatId, type){
    updateUserStateRoomType(chatId,type);
    console.log(userState);
    sendRoom(chatId);
}

const TELEGRAM_CHANNEL_ID = '-1002140539152'; // Замените YOUR_CHANNEL_ID на ID вашего канала в Telegram

// Функция для отправки информации о бронировании в телеграмм-канал
function sendBookingToChannel(chatId, bookingInfo) {
    bot.sendMessage(TELEGRAM_CHANNEL_ID, bookingInfo);
}


function handleBooking(chatId) {
    bot.sendMessage(chatId, 'Введите Ваши:\n1) ФИО\n2) Ваш ник tg\n3) Ваш номер телефона для связи').then(() => {
        // Добавим обработчик для получения контактных данных от пользователя
        bot.once('message', (msg) => {
            const userData = userState[chatId];
            const district = userData.district;
            const roomType = userData.roomType;
            const apartment = apartmentsData[district][roomType][0]; // Предполагаем, что пользователь может забронировать только одну квартиру

            const bookingInfo = `Квартира: ${userData.district}, ${userData.roomType}\n\n${apartment.description}\n\nКонтактные данные: ${msg.text}`;

            // Отправляем информацию о бронировании в канал
            sendBookingToChannel(TELEGRAM_CHANNEL_ID, bookingInfo);

            // Отправляем подтверждение бронирования пользователю
            bot.sendMessage(chatId, 'Ваше бронирование успешно оформлено!')
        });
    });
}

function sendRoom(chatId) {
    // Получаем информацию из userState
    const userData = userState[chatId];

    // Получаем выбранный район и количество комнат пользователя
    const district = userData.district;
    const roomType = userData.roomType;

    // Получаем данные о квартирах
    const apartments = apartmentsData[district][roomType];

    // Отправляем квартиры пользователю
    apartments.forEach((apartment) => {
        let media = [];

        apartment.photos.forEach((photo) => {
            media.push({type: 'photo', media: photo});
        });

        bot.sendMediaGroup(chatId, media).then(() => {
            const caption = `${apartment.description}`;
            bot.sendMessage(chatId, caption);
        });
    });
    sendBookingMenu(chatId);
}


// Функция для отправки информации об арендодателе
function sendLandlordInfo(chatId) {
    // Отправляем информацию об арендодателе
    console.log('landlord')
    bot.sendMessage(chatId, 'Информация об арендодателе');
}


