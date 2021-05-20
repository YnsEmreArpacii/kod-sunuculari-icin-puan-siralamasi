const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');

exports.run = async (client, msg, args) => {
    msg.delete();
   if(!msg.member.roles.cache.some(r => r.name === "Teknik Destek") && !msg.member.roles.cache.some(r => r.name === "Deniniyorsunuz") && !msg.member.hasPermission("ADMINISTRATOR")) return msg.reply("Bu Komutu Kullana Bilmek İçin Yönetici Permi veya 👑 Rolüne Olmalısınız.").then(msg => {setTimeout(() => {msg.delete()}, 60000);})   
  const yasak = client.emojis.cache.get('829286987806670869');
      let u = msg.mentions.users.first() || msg.author;

        if(u.bot === true) {
                const embed = new Discord.MessageEmbed()
                        .setDescription("Botların seviyesi bulunmamaktadır!")
                        .setColor("RANDOM")
                msg.channel.send(embed)
                return
        }
        let sira = '';
        var str = ''
        const sorted = msg.guild.members.cache.filter(u => !u.user.bot).array().sort((a, b) => { return db.fetch(`hseviye_${b.user.id + msg.guild.id}`) - db.fetch(`hseviye_${a.user.id + msg.guild.id}`) });
        const top10 = sorted.splice(0, msg.guild.members.cache.size)
        const mappedName = top10.filter(o => !o.bot).map(s => s.user.id);
        const mappedLevel = top10.filter(o => !o.bot).map(s => db.fetch(`hseviye_${s.user.id + msg.guild.id}`) || 0)
        const emoji = client.emojis.cache.get('819252370005164073');

        const mappedID = top10.map(s => s.user.id);
        for(var i = 0; i < 10; i++) {
            var lvl = mappedLevel[i]
      
            if(msg.author.id === mappedID[i]) {
                str += `**[${i + 1}]** ${emoji} <@${mappedName[i]}>\n  **Puan:** ${lvl} \n\n`
            }

            if(msg.author.id !== mappedID[i]) {
                str += `**[${i + 1}]** ${emoji} <@${mappedName[i]}>\n  **Puan:** ${lvl} \n\n`
            }
        }

        if(u.bot === true) {
                const embed = new Discord.MessageEmbed()
                        .setDescription("Botların seviyesi bulunmamaktadır!")
                        .setColor("RANDOM")
                msg.channel.send(embed)
                return
        }
  
        let wEmbed = new Discord.MessageEmbed()
        .setTitle(`👑 | Haftalık Puan Sistemi`)
        .setColor('RANDOM')
        .setDescription(`${str}`)
        msg.channel.send(wEmbed).then(msg => {
            let text = `${str}`          
            msg.edit(msg,text)
          
        })
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["hsıralama", "hlider", "hlidertablosu"],
  permLevel: 0,
    kategori: "lvl"
};

exports.help = {
  name: 'hsıralama',
  description: 'Seviye sisteminin sunucudaki liderlik tablosunu gĂ¶sterir.',
  usage: 'hsıralama'
};