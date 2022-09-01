exports.name = "servers";
exports.description = "Returns the amount of servers CoHance Tai is in.";
exports.run = run;
const Discord = require("discord.js");

function run(interaction, client, bExports){
    const {commandName, options} = interaction;
    const servers = client.guilds.cache.size;
    //console.log(client.guilds.cache);
    interaction.reply({
        content: `The bot is in ${servers} servers.`,
        ephemeral: true,
    })
}