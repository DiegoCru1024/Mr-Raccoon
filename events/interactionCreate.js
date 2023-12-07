const {Events} = require('discord.js')
const {verifyUser} = require("../controllers/userController")

module.exports = {
    name: Events.InteractionCreate,
    async execute(interactionEvent) {
        if (!interactionEvent.isChatInputCommand()) return
        await verifyUser(interactionEvent.client, interactionEvent.guild.id, interactionEvent.user.id)

        const command = interactionEvent.client.commands.get(interactionEvent.commandName)

        try {
            await command.execute(interactionEvent)
        } catch (error) {
            console.error(error)
            await interactionEvent.reply({content: 'Error de ejecución.', ephemeral: true})
        }
    }
}