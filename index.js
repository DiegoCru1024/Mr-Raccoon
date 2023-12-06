require("dotenv/config")
const {Client, GatewayIntentBits} = require('discord.js')
const {loadCommands} = require('./utils/commandLoader')


const express = require('express')
const app = express()

app.listen(process.env.PORT || 5000, () => {
    console.log('[LOG] Servidor iniciado correctamente...')
})

const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
})

discordClient.on("ready", () => {
    console.log('[LOG] Mr. Raccoon esta operativo...')
    loadCommands(discordClient)
})

discordClient.on("interactionCreate", async (interactionEvent) => {
    if (!interactionEvent.isChatInputCommand()) return;

    const command = interactionEvent.client.commands.get(interactionEvent.commandName);

    try {
        await command.execute(interactionEvent);
    } catch (error) {
        console.error(error);
        await interactionEvent.reply({content: 'Error de ejecución.', ephemeral: true});
    }
});

discordClient.login(process.env.TOKEN).then(() => {
})