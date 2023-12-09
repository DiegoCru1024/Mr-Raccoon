require("dotenv/config")
const {Client, GatewayIntentBits} = require('discord.js')
const {loadCommands} = require('./utils/commandLoader')
const databaseConnect = require('./utils/databaseDriver')

const express = require('express')
const {loadEvents} = require("./utils/eventLoader");
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

databaseConnect().then(() => {
    loadCommands(discordClient)
    loadEvents(discordClient)
})

discordClient.login(process.env.TOKEN).then(() => {

})