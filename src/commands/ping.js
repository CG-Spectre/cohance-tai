exports.name = "ping";
exports.description = "Returns the bot's ping.";
exports.run = run;
const Discord = require("discord.js");

function run(interaction, client, bExports){
    //console.log("hi")
    //Discord.BaseInteraction.prototype.
    const {commandName, options} = interaction;
    const ping = Math.round(client.ws.ping);
    interaction.reply({
        content: `Pong! ${ping}ms.`,
        ephemeral: true,
    })
}