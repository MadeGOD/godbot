const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (client, message, args) => {
let queue = args.join(" ");
if (!queue) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | Please enter a query to search!` }})

let playing = client.player.isPlaying(message.guild.id);

if(playing){
    let song = await client.player.addToQueue(message.guild.id, queue);
    message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.success} | ${song.name} 을 대기열에 추가했어요!` }})
} else {
    let song = await client.player.play(message.member.voice.channel, queue);
    message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.music} | 현재 재생중인 곡:\n${song.name}` }})
    song.queue.on('end', () => {
    message.channel.send({embed: {color: client.colors.warning, description: `${client.emotes.warning} | 대기열이 비었어요 곡을 더 추가해주세요!` }})
    });

    song.queue.on('songChanged', (oldSong, newSong, skipped, repeatMode) => {
        if(repeatMode){
            message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.repeat} | 반복중 :\n ${oldSong.name}` }})
        } else {
            message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.music} | 현재 재생중인 곡:\n ${newSong.name}` }})
        }
    });
}
}
exports.config = {
    name: '듣기',
    aliases: ['p', 'play', '듣기', '듣자'],
    category: ['노래'],
    des: ['노래를 추가합니다.'],
    use: ['ㄲ 듣기']
}
