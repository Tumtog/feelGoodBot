require("dotenv").config();
const { Bot, InlineKeyboard } = require("grammy");
const cron = require("node-cron");
const express = require("express");
const bodyParser = require("body-parser");

const bot = new Bot(process.env.BOT_API_KEY);
const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  bot.handleUpdate(req.body);
  res.sendStatus(200);
});

// Удаление вебхука перед установкой нового
const setupWebhook = async () => {
  try {
    await bot.api.deleteWebhook();
    console.log("Webhook deleted successfully");

    const webhookUrl =
      "https://feel-good-7ttut77ol-tumtogs-projects.vercel.app/webhook";
    await bot.api.setWebhook(webhookUrl);
    console.log("Webhook set successfully");
  } catch (err) {
    console.error("Error:", err);
  }
};

setupWebhook();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;

// Команды
bot.api.setMyCommands([
  {
    command: "start",
    description: "Начать",
  },
]);

// Похвалы для женщин
const womenCompliments = [
  "Ти чудово справляєшся! 🌟",
  "Ти виглядаєш приголомшливо! 😍",
  "У тебе чудове почуття гумору! 😂",
  "Ти дуже розумна! 💡",
  "Ти надихаєш мене! ✨",
  "Ти - справжня зірка! 🌟",
  "Ти робиш цей світ яскравішим! 🌈",
  "Твоя усмішка - це сонячний промінь! ☀️",
  "Ти дуже талановита! 🎨",
  "Ти - неперевершена! 👑",
  "Ти така ніжна і чуйна! 💖",
  "Твоя доброта вражає! 🌷",
  "Ти - джерело позитиву! 🌻",
  "Ти заслуговуєш на всі компліменти світу! 🌏",
  "Ти - справжня героїня! 🦸‍♀️",
  "Твоя енергія заразлива! ⚡",
  "Ти - натхнення для всіх навколо! 💫",
  "Ти робиш людей щасливими! 😊",
  "Твій стиль вражає! 👗",
  "Ти завжди на висоті! 🚀",
  "Ти - неймовірна! 🏆",
  "Твоя краса неперевершена! 🌹",
  "Ти - справжня леді! 👸",
  "Твоя теплота завжди зігріває! 🌞",
  "Ти - як літній день! 🌞",
  "Ти - чудова і унікальна! 🦄",
  "Твій смак бездоганний! 👠",
  "Ти робиш цей світ кращим! 🌟",
  "Ти вражаєш своїм розумом! 🧠",
  "Ти - справжня майстриня! 🧵",
  "Твоя чарівність не має меж! 💫",
  "Ти - просто чудова! 🌟",
  "Ти - моя зірочка! ⭐",
  "Ти - справжня муза! 🎼",
  "Твоя ніжність не має рівних! 🌸",
  "Ти - джерело щастя! 🎉",
  "Твоя впевненість захоплює! 💪",
  "Ти - справжній скарб! 💎",
  "Твоя краса зачаровує! 🥰",
  "Ти - неймовірна людина! 🌟",
  "Ти - чудо! 🌟",
  "Твоя елегантність вражає! 👗",
  "Ти - як промінь світла! 🌟",
  "Ти - ніжна і чуйна! 💕",
  "Твоя усмішка - це щастя! 😊",
  "Ти - справжня зірка шоу! 🌠",
  "Твоя доброта освітлює шлях! ✨",
  "Ти - неймовірна і неперевершена! 💫",
];

// Похвалы для мужчин
const menCompliments = [
  "Ти чудово справляєшся! 💪",
  "Ти виглядаєш приголомшливо! 😎",
  "У тебе чудове почуття гумору! 😂",
  "Ти дуже розумний! 🧠",
  "Ти надихаєш мене! 🔥",
  "Ти - справжній лідер! 🏆",
  "Ти завжди на висоті! 🚀",
  "Твоя впевненість захоплює! 💪",
  "Ти - справжній джентльмен! 👔",
  "Твоя сила вражає! 💪",
  "Ти - зразок мужності! 🦸‍♂️",
  "Твоя харизма вражає! 😎",
  "Ти - неймовірний! 🌟",
  "Ти - справжній професіонал! 🎯",
  "Ти завжди на висоті! 🚀",
  "Твоя енергія заражає! ⚡",
  "Ти - справжній майстер! 🛠️",
  "Ти завжди впевнений у собі! 💪",
  "Ти - чудовий друг! 🤝",
  "Ти надихаєш на великі справи! 🌟",
  "Твій стиль бездоганний! 👔",
  "Ти - втілення надії! 🌠",
  "Ти - справжній герой! 🦸‍♂️",
  "Твоя мудрість захоплює! 📚",
  "Ти завжди знаєш, як вразити! 🔥",
  "Ти - приклад для наслідування! 💪",
  "Твоя доброта вражає! 🌟",
  "Ти - неймовірний! 💫",
  "Ти завжди знаєш, що сказати! 🗣️",
  "Ти - справжній артист! 🎨",
  "Ти - чудовий партнер! 💏",
  "Твоя елегантність вражає! 👔",
  "Ти - справжній гуру! 🧘‍♂️",
  "Твоя харизма просто неймовірна! 😎",
  "Ти - справжній зразок! 🏆",
  "Твоя сила і розум поєднуються! 🧠",
  "Ти - людина з великої літери! 💯",
  "Твій стиль вражає! 👟",
  "Ти - джерело натхнення! 🌟",
  "Ти - справжній мачо! 💪",
  "Твоя відданість вражає! 🙌",
  "Ти - унікальний! ⭐",
  "Ти - справжній стратег! 🧠",
  "Твоя щирість вражає! 💖",
  "Ти - справжній спортсмен! 🏋️",
  "Ти завжди знаєш, як бути в центрі уваги! 🌟",
  "Ти - дивовижний! 🎉",
  "Твоя харизма просто зашкалює! ⚡",
];

// Персональные похвалы для Сніжани
const snezhanaCompliments = [
  "Сніжана, ти просто чудова! 🌟",
  "Моя Сніжана, ти неймовірна! 😍",
  "Ти - моє натхнення, Сніжана! ✨",
  "Ти - моя зірочка, Сніжана! 🌟",
  "Сніжана, ти робиш мій світ яскравішим! 🌈",
  "Твоя усмішка, Сніжана, - це найкращий подарунок! ☀️",
  "Моя кохана Сніжана, ти - найкраща! 💖",
  "Сніжана, ти - справжня королева! 👑",
  "Ти - моє сонце, Сніжана! 🌞",
  "Сніжана, твоя доброта безмежна! 🌷",
  "Моя Сніжана, ти - джерело щастя для мене! 🎉",
  "Ти - чудо, Сніжана! 🌟",
  "Сніжана, ти - моя муза! 🎼",
  "Твоя ніжність, Сніжана, просто неймовірна! 🌸",
  "Сніжана, ти - найкрасивіша! 🌹",
  "Ти - мій ангел, Сніжана! 😇",
  "Сніжана, ти - моя велика любов! 💕",
  "Ти - моя радість, Сніжана! 🎊",
  "Сніжана, твоя чарівність не має меж! 💫",
  "Ти - моє серце, Сніжана! ❤️",
  "Сніжана, ти - мій всесвіт! 🌌",
  "Твоя усмішка - це магія, Сніжана! ✨",
  "Сніжана, ти - як сонце в похмурий день! 🌞",
  "Ти - мій подарунок долі, Сніжана! 🎁",
  "Сніжана, ти - безцінна! 💎",
  "Ти - моя казка, Сніжана! 📖",
  "Сніжана, ти - найкраща у світі! 🌏",
  "Ти - моє натхнення, Сніжана! 🌟",
  "Сніжана, ти - справжній скарб! 🏆",
  "Ти - моя любов, Сніжана! 💘",
  "Сніжана, ти - моя гордість! 🏅",
  "Твоя краса, Сніжана, просто незрівнянна! 😍",
  "Сніжана, ти - моя радість! 😊",
  "Ти - найчарівніша, Сніжана! 🌟",
  "Сніжана, ти - моя душа! 💖",
  "Ти - як промінь світла, Сніжана! 🌟",
  "Сніжана, ти - найкраща з найкращих! ⭐",
  "Ти - моє щастя, Сніжана! 🎉",
  "Сніжана, ти - моя найкраща подруга! 🤝",
  "Твоя краса захоплює, Сніжана! 🌹",
  "Сніжана, ти - справжня принцеса! 👸",
  "Ти - мій ідеал, Сніжана! 💫",
  "Сніжана, ти - моє все! ❤️",
  "Твоя доброта, Сніжана, - це моє натхнення! 🌷",
  "Сніжана, ти - мій всесвіт! 🌌",
  "Ти - моя кохана, Сніжана! 💕",
  "Сніжана, ти - найкраща! 🥇",
  "Твоя усмішка, Сніжана, - це моє сонце! ☀️",
  "Сніжана, ти - моя гордість! 🏅",
];
const snezhanaId = 408453544; // Замените на ID Сніжани
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

const clearChatMessages = async (chatId) => {
  // Вебхуки могут не поддерживать метод getChatHistory
  // Этот код должен быть переписан в зависимости от используемых методов
};

const scheduleDailyCleanup = () => {
  cron.schedule(
    "0 3 * * *",
    async () => {
      for (const chatId in userGender) {
        await clearChatMessages(chatId);
      }
    },
    {
      scheduled: true,
      timezone: "Europe/Kiev",
    }
  );
};

scheduleDailyCleanup();

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
