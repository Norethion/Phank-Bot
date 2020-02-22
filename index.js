const token = require("./token.json");
const ayarlar = require("./ayarlar.json")
const Discord = require("discord.js");
const moment = require('moment');
const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();
bot.music = require("discord.js-musicbot-addon");
bot.music.start(bot, {
  botPrefix : "-",
  youtubeKey: "AIzaSyDxa8nHi6_ucyJlAAwzCTE25YIT1IAi4L8",
  help: {
    help: "Komutlar için müzik.",
    name: "muzik"
  }
});

let statuses = ['Komutlar için -yardım']
bot.on("ready", async () => {
  console.log(`------- ${bot.user.username} Bot ------- \n> Version: Alpha\n> Aktif\n------- ${bot.user.username} Bot -------`);
  bot.user.setActivity("Kodunun Yapılışını", { type: "watching" })
  setInterval(function () {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setPresence({ game: { name: status }, status: 'Online' });
  }, 5000)
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Şu an ` + bot.channels.size + ` adet kanala, ` + bot.guilds.size + ` adet sunucuya ve ` + bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);

})

bot.on("message", async message => {

  if (message.content.startsWith("-yardım")) {
    const yardım = new Discord.RichEmbed()
      .setColor(0x36393E)
      .setAuthor(`Phank Bot`, bot.user.avatarURL)
      .setThumbnail(bot.user.avatarURL)
      .addField(":white_check_mark:","Komutlar için -muzik")
      .setFooter(`${message.author.username} tarafından istendi.`, message.author.avatarURL)
    return message.channel.sendEmbed(yardım);
  }



});

bot.login(process.env.TOKEN);
