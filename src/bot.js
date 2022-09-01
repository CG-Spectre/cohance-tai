const Discord = require("discord.js");
const express = require("express");
const fs = require("fs");
let botExports = {};
require('dotenv').config();
const app = express();
app.get("/", (req, res)=>{
    res.send("Bot is online. Hosted on Heroku.");
})
app.listen(process.env.PORT, ()=>{})

const EmbedBuilder = Discord.EmbedBuilder;
const client = new Discord.Client({
    intents:[
        Discord.IntentsBitField.Flags.GuildMembers,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.GuildPresences,
    ]
});
let guilds = [];
const mainGuildId = "924868633488937071";
let commandsA = [];
client.once("ready", ()=>{
    console.log("Bot is now online as " + client.user.username + ".");
    reloadCommands();
    client.user.setPresence({
        status:"online",
        activities:[
            {
                name:"CoHance Studios",
            }
        ]
    });
});
function reloadCommands(){
    for(i in client.guilds.cache.map(guild => guild.id)){
        guilds.push(client.guilds.cache.map(guild => guild.id)[i]);
    }
    botExports.guilds = guilds;
    for(i in guilds){
        guild = client.guilds.cache.get(mainGuildId);
        let commands;
        if(guild){
            commands = guild.commands;
        }else{
            commands = client.application?.commands;
        }
        fs.readdir(__dirname + "/commands/", (err, files)=>{
            if(err){
                console.log(err);
            }else{
                files.forEach((file)=>{
                    const commandModule = require(__dirname + "/commands/"+file);
                    commands?.create({
                        name:commandModule.name,
                        description: commandModule.description
                    });
                    if(!commandsA.includes(commandModule.name)){
                        commandsA.push(commandModule.name);
                    }
                })
            }
        });
    }
    
}
client.on("interactionCreate", async (interaction) => {
    if(!interaction.isCommand()){
        return
    }
    for(i in commandsA){
        if(commandsA[i] == interaction.commandName){
            const commandModule = require(__dirname + "/commands/"+commandsA[i]);
            commandModule.run(interaction, client, botExports);
        }
    }
    
});


client.login(process.env.TOKEN);