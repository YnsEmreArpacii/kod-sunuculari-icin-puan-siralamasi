// komutlar/ Klasörü 

const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    message.delete()
   if(!message.member.roles.cache.some(r => r.name === "👑") && !message.member.hasPermission("ADMINISTRATOR")) return message.reply("Bu Komutu Kullana Bilmek İçin Yönetici Permi veya 👑 Rolüne Olmalısınız.").then(message => {setTimeout(() => {message.delete()}, 60000);}) 

    await message.guild.members.cache.forEach(u => {
    let seviye = db.set(`hseviye_${u.id + message.guild.id}`, "0");
    let guncelseviye = db.fetch(`hseviye_${u.id + message.guild.id}`,);
   })
   message.channel.send('Sıfırlandı!')
   return 
 
};

exports.conf = {
    enabled: false,
    guildOnly: true,
    aliases: ['hsıfırla'],
    permLevel: 0
};

exports.help = {
  name: 'hsıfırla',
  description: 'Belirttiğiniz rolü herkese verir/alır.',
  usage: 'hsıfırla',
  kategori: 'yetkili'
};