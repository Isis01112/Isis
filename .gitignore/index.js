const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("Je ne trouve pas la commande.");
      return;
    }
  
    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} chargé!`);
      bot.commands.set(props.help.name, props);
    });
  });
  
  bot.on("ready", async () => {
    console.log(`${bot.user.username} est connectée`);
    bot.user.setActivity("Si le serveur se porte bien", {type: "WATCHING"});
  
  });
  
  bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
  
});


bot.login("NTYxNDc5OTMwOTA3NzIxNzM4.XfTabg.P4kA9hujBgoCWZjHR3bLacPfZwg");
  
 
