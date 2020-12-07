const {MessageEmbed} = require('discord.js')
const Discord = require('discord.js')
const settings = require('../../config/bot.json')



exports.run = async (client, msg, prefix) => {
const Hook = new Discord.WebhookClient(settings.webhook.id, settings.webhook.token)
const server = client.guilds.cache.get(settings.serverId)
const ch = server.channels.cache.get(settings.channelId)
if (!client.devs.includes(msg.author.id))
    return msg.reply("이 명령어는 Dev 권한이 필요합니다");
    if (msg.channel.type === "dm") return

    const args = msg.content.split(' ').slice(1)
    if (client.devs.includes(msg.author.id)) {
      if (args.length < 2) {
        msg.reply('사용법: `ㄲ 답변 (ID) [TEXT]`')
      } else {
        const content = args.slice(1).join(' ')
        const user = client.users.cache.get(args[0])
        user.send(`《${msg.author.tag}》 : ` + content)
          .then(msg.reply('성공적으로 메세지를 DM으로 보냈습니다.'))
          .catch((e)=>{
Hook.send("에러가 발생\n"+e)
})
      }
    }
}

exports.config = {
  name: "답변",
  aliases: ["reply", "ekqqus", "ㄱ데ㅣㅛ"],
  category: ["관리자"],
  des: ["메세지를 DM으로 보냅니다."],
  use: ["ㄲ 답변 <ID> <내용>"]
};
