require('dotenv').config()

const {Client, GatewayIntentBits, Collection, Events, EmbedBuilder} = require("discord.js")
const express = require('express')
const app = express()

app.set('port', process.env.PORT || 5000)

app.get(`/`, function (req, res) {
    res.send('[LOG] Express en funcionamiento...')
}).listen(app.get(`port`), function () {
    console.log("[LOG] Aplicación en ejecución, servidor alojado en el puerto: " + app.get("port"))
})

const discordClient = new Client({
    intents: []
})

discordClient.once(Events.ClientReady, () => {
    console.log(`${discordClient.user.username} esta operativo...`)
    loadCommands(discordClient)
})
