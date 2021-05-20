const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const db = require('quick.db');

require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

// SEVIYE \\
const dba = require('quick.db');
client.on("message", async msg => {
      const emoji = client.emojis.cache.get('706673080402968707');
          let guncelseviye = await db.fetch(`seviye_${msg.author.id + msg.guild.id},`);
          let hguncelseviye = await db.fetch(`hseviye_${msg.author.id + msg.guild.id},`);

      const seviyeatlama = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`
      ${emoji} **Puan Atlayan:** <@${msg.author.id}>
      ${emoji} **Puan: ** ${guncelseviye}
      ${emoji} **Haftalık Puan: ** ${hguncelseviye}
`);  
  
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;

  if(msg.member.roles.cache.some(r => r.name === "Destek Ekibi") || msg.member.roles.cache.some(r => r.name === "Deneniyorsunuz")){
  if (msg.content.length > 7) {
  if (msg.channel.id == '829100787690111028') {
    dba.add(`seviye_${msg.author.id + msg.guild.id}`, 1);
    dba.add(`hseviye_${msg.author.id + msg.guild.id}`, 1);
  }
  if (msg.channel.id == '829100813238403092') {
    dba.add(`seviye_${msg.author.id + msg.guild.id}`, 1);
    dba.add(`hseviye_${msg.author.id + msg.guild.id}`, 1);
  }
  if (msg.channel.id == '829100845018775583') {
    dba.add(`seviye_${msg.author.id + msg.guild.id}`, 1);
    dba.add(`hseviye_${msg.author.id + msg.guild.id}`, 1);
  }
  if (msg.channel.id == '829100871718535218') {
    dba.add(`seviye_${msg.author.id + msg.guild.id}`, 1);
    dba.add(`heviye_${msg.author.id + msg.guild.id}`, 1);  }
  }}
});
// SEVIYE \\a