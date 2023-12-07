require('dotenv/config')
const {REST, Routes} = require('discord.js')
const fs = require('fs')
const path = require('path')

const commands = []
const foldersPath = path.join(__dirname, '../commands')
const commandFiles = fs.readdirSync(foldersPath)

for (const file of commandFiles) {
    if (file.endsWith('.js')) {
        const filePath = path.join(foldersPath, file)
        const command = require(filePath)

        if (command && 'data' in command && 'execute' in command) {
            commands.push(command.data.toJSON())
        } else {
            console.log(`[WARNING] El comando en ${file} está faltando la propiedad "data" o "execute" requerida.`)
        }
    }
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`)

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT, process.env.GUILD),
            {body: commands},
        )

        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT),
            {body: commands},
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`)
    } catch (error) {
        console.error(error)
    }
})()