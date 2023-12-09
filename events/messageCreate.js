const {Events} = require('discord.js')
const {verifyUser} = require("../controllers/userController");
const {xpController} = require("../controllers/xpController");

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        try {
            if (message.author.id === message.client.application.id) return

            await verifyUser(message.client, message.guild.id, message.author.id)
        } catch (error) {
            console.error('Error al manejar el evento messageCreate:', error)
        }
    },
}
