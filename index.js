require("dotenv").config();
const { Bot, InlineKeyboard } = require("grammy");
const cron = require("node-cron");
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch"); // Импортируем node-fetch

// Настраиваем параметры fetch
const customFetch = (url, options) => {
  // Добавляем повторные попытки и другие параметры, если необходимо
  return fetch(url, {
    ...options,
    retry: 3, // Например, количество повторных попыток
    retryDelay: 1000, // Задержка между попытками
  });
};

// Создаем экземпляр бота с кастомным fetch
const bot = new Bot(process.env.BOT_API_KEY, { fetch: customFetch });
const app = express();
app.use(bodyParser.json());

const webhookUrl = "https://feel-good-7ttut77ol-tumtogs-projects.vercel.app/webhook";

// Функция установки вебхука
const setWebhook = async () => {
  try {
    // Удаляем старый вебхук
    await bot.api.deleteWebhook();
    console.log("Webhook deleted successfully");

    // Проверяем, что вебхук действительно удален
    const webhookInfo = await bot.api.getWebhookInfo();
    if (webhookInfo.url) {
      console.log("Webhook still exists, retrying...");
      await new Promise(resolve => setTimeout(resolve, 5000));
      await bot.api.deleteWebhook(); // Пытаемся удалить снова
    }

    // Добавляем задержку для завершения удаления
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Устанавливаем новый вебхук
    await bot.api.setWebhook(webhookUrl);
    console.log("Webhook set successfully");
  } catch (err) {
    console.error("Error setting webhook:", err);
  }
};

// Устанавливаем вебхук при запуске
setWebhook();

// Обработка вебхука
app.post("/webhook", (req, res) => {
  bot.handleUpdate(req.body).catch(err => {
    console.error("Error handling update:", err);
  });
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Похвалы для женщин
const womenCompliments = [
  "Ти чудово справляєшся! 🌟",
  "Ти виглядаєш приголомшливо! 😍",
  // другие комплименты
];

// Похвалы для мужчин
const menCompliments = [
  "Ти чудово справляєшся! 💪",
  "Ти виглядаєш приголомшливо! 😎",
  // другие комплименты
];

// Персональные похвалы для Сніжани
const snezhanaCompliments = [
  "Сніжана, ти просто чудова! 🌟",
  "Моя Сніжана, ти неймовірна! 😍",
  // другие комплименты
];

const snezhanaId = 408453544; // Замените на ID Сніжаны
const userGender = {}; // Объект для хранения пола пользователя по chatId

const getRandomCompliment = (compliments) => {
  return compliments[Math.floor(Math.random() * compliments.length)];
};

const sendRandomCompliment = async (chatId, compliments) => {
  const compliment = getRandomCompliment(compliments);
  await bot.api.sendMessage(chatId, compliment);
};

const getRandomTime = (startHour, startMinute, endHour, endMinute) => {
  const start = new Date();
  start.setHours(startHour, startMinute, 0, 0);
  const end = new Date();
  end.setHours(endHour, endMinute, 0, 0);

  const randomTime = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return {
    hour: randomTime.getHours(),
    minute: randomTime.getMinutes(),
  };
};

const scheduleDailyMessages = (chatId, compliments) => {
  // Планируем первое сообщение на 8:00
  cron.schedule("0 8 * * *", () => sendRandomCompliment(chatId, compliments), {
    scheduled: true,
    timezone: "Europe/Kiev",
  });

  // Планируем последнее сообщение на 22:30
  cron.schedule(
    "30 22 * * *",
    () => sendRandomCompliment(chatId, compliments),
    {
      scheduled: true,
      timezone: "Europe/Kiev",
    }
  );

  // Планируем 5 случайных сообщений в течение дня
  for (let i = 0; i < 5; i++) {
    const { hour, minute } = getRandomTime(8, 1, 22, 29); // Генерируем случайное время между 8:00 и 22:30
    cron.schedule(
      `${minute} ${hour} * * *`,
      () => sendRandomCompliment(chatId, compliments),
      {
        scheduled: true,
        timezone: "Europe/Kiev",
      }
    );
  }
};

bot.command("start", async (ctx) => {
  const userId = ctx.from.id;
  const chatId = ctx.chat.id;

  if (userId === snezhanaId) {
    await ctx.reply("Привіт, Сніжана!");
    scheduleDailyMessages(chatId, snezhanaCompliments);
    sendRandomCompliment(chatId, snezhanaCompliments);
  } else {
    const genderKeyboard = new InlineKeyboard()
      .text("Женщина", "gender_female")
      .text("Мужчина", "gender_male");

    await ctx.reply("Пожалуйста, укажите ваш пол:", {
      reply_markup: genderKeyboard,
    });
  }
});

bot.on("callback_query", async (ctx) => {
  const chatId = ctx.chat.id;
  const data = ctx.callbackQuery.data;

  if (data === "gender_female") {
    userGender[chatId] = "female"; // Сохраняем пол
    await ctx.reply("🔥");
    scheduleDailyMessages(chatId, womenCompliments);
    sendRandomCompliment(chatId, womenCompliments);
    await ctx.deleteMessage();
  } else if (data === "gender_male") {
    userGender[chatId] = "male"; // Сохраняем пол
    await ctx.reply("🔥");
    scheduleDailyMessages(chatId, menCompliments);
    sendRandomCompliment(chatId, menCompliments);
    await ctx.deleteMessage();
  }
});

// Обработка текстовых сообщений
bot.on("message:text", async (ctx) => {
  const chatId = ctx.chat.id;

  if (!userGender[chatId]) {
    // Если пол не выбран, просим выбрать
    const genderKeyboard = new InlineKeyboard()
      .text("Женщина", "gender_female")
      .text("Мужчина", "gender_male");

    await ctx.reply("Пожалуйста, укажите ваш пол:", {
      reply_markup: genderKeyboard,
    });
  } else {
    // Отправляем похвалу в зависимости от выбранного пола
    const compliments =
      userGender[chatId] === "female" ? womenCompliments : menCompliments;
    sendRandomCompliment(chatId, compliments);
  }
});

// Обработка ошибок
bot.catch((err) => {
  console.error("Error occurred:", err);
});

bot.start();

console.log("Бот запущен!");
