const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');
const { stripIndents } = require('common-tags');
const snekfetch = require("snekfetch");

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
  
  var g = "50"
  
  var Canvas = require('canvas')
        var canvas = Canvas.createCanvas(750, 240)
        var ctx = canvas.getContext('2d');
        const avatarURL = u.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
        const { body } = await request.get(avatarURL);
        const avatar = await Canvas.loadImage(body);
  
//  ctx.fillStyle = "#000000";
//  ctx.fill()
//        ctx.fillRect(25, 20, 700, 200)  
  
  
  
//        ctx.fillStyle = "rgba(0, 0, 0, 0.30)";
//        ctx.fill()
//        ctx.fillRect(0, 0, 750, 240)
  
        var re = "db3b3b"
  
  var xp = db.fetch(`puan_${u.id + msg.guild.id}`);
  var lvl = db.fetch(`seviye_${u.id + msg.guild.id}`);  
  var hlvl = db.fetch(`hseviye_${u.id + msg.guild.id}`);  

        let vUser = msg.guild.member(msg.mentions.users.first());
        const emoji = client.emojis.cache.get('702138649151668284');
        let sira = ''
        const sorted = msg.guild.members.cache.filter(u => !u.user.bot).array().sort((a, b) => { return db.fetch(`seviye_${b.user.id + msg.guild.id}`) - db.fetch(`seviye_${a.user.id + msg.guild.id}`) });
        const top10 = sorted.splice(0, msg.guild.members.cache.size)
        const mappedID = top10.map(s => s.user.id);
        for(var i = 0; i < msg.guild.members.cache.size; i++) {
                if(mappedID[i] === u.id) {
                        sira += `${i + 1}`
                }
        }

        var de = 1.6
        ctx.beginPath()
        ctx.fillStyle = "#999999";
        ctx.fill();
        ctx.fillRect(100 + 18.5, 130 + 36.15, 250 * de, 37.5);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `#${re}`;
        ctx.fill();
        ctx.fillRect(100 + 18.5, 130 + 36.25, xp * de, 37.5);
        ctx.fill();
        ctx.fillStyle = `#${re}`;
        ctx.textAlign = "right";
        ctx.font = '23px Impact';
        ctx.fillStyle = `#f0fc00`;  
        ctx.fillText(`Haftalık Puan: ${hlvl || 0}`, 180, 155);
        ctx.fillText(`Toplam Puan: ${lvl || 0}`, 180, 125);
        ctx.fillText(`Sıralama: ${sira}`, 180, 95);
        ctx.fillStyle = `#63fcf3`;
        ctx.font = '25px Impact';
        ctx.textAlign = "right";
        ctx.fillText(`BILGILER`, 170, 60);
        ctx.fillText(`RESIM`, 670, 50);
        ctx.font = 'bold 25px Impact';
        ctx.textAlign = "right";
        ctx.fillStyle = `#FFFFFF`;
        ctx.fillText(`∼ Puan ∼`, 450, 55);
  ctx.fillStyle = `#fcfdff`;
  ctx.font = 'bold 20px Impact';
        ctx.textAlign = "left";
        ctx.fillText(`${u.username}`, 115, 220)
        ctx.beginPath();
        ctx.lineWidth = 8;
  ctx.fill()
        ctx.lineWidth = 8;
        ctx.arc(570 + 67, 67 + 67, 67, 0, 2 * Math.PI, false);
    ctx.clip();
    ctx.drawImage(avatar, 570, 67, 135, 135);
    
        msg.channel.send({files:[{attachment:canvas.toBuffer(),name:"seviye.png"}]})
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['puan'],
  permLevel: 0,
};

exports.help = {
  name: 'puan',
  description: '',
  usage: 'puan'
};