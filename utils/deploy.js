require('dotenv/config');
const {REST, Routes} = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const foldersPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(foldersPath);

for (const file of commandFiles) {
    if (file.endsWith('.js')) {
        const filePath = path.join(foldersPath, file);
        const command = require(filePath);

        if (command && 'data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] El comando en ${file} está faltando la propiedad "data" o "execute" requerida.`);
        }
    }
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
    try {
        const args = process.argv.slice(2)
        console.log(args)

        const isGlobal = args.includes('-global');
        const isGuild = args.includes('-guild');

        if (isGlobal) {
            console.log('Started deleting guild commands.');

            const guildCommands = await rest.get(
                Routes.applicationGuildCommands(process.env.CLIENT, process.env.GUILD)
            );

            // Obtienes los IDs de los comandos específicos del servidor
            const guildCommandIds = guildCommands.map(command => command.id);

            await Promise.all(guildCommandIds.map(async id => {
                await rest.delete(
                    Routes.applicationGuildCommand(process.env.CLIENT, process.env.GUILD, id)
                );
            }));

            console.log('Successfully deleted guild commands.');
            console.log(`Started refreshing ${commands.length} application (/) commands globally.`);

            const data = await rest.put(
                Routes.applicationCommands(process.env.CLIENT),
                {body: commands},
            );

            console.log(`Successfully reloaded ${data.length} application (/) commands globally.`);
        }

        if (isGuild) {
            console.log(`Started refreshing ${commands.length} application (/) commands in the guild.`);

            const data = await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT, process.env.GUILD),
                {body: commands},
            );

            console.log(`Successfully reloaded ${data.length} application (/) commands in the guild.`);
        }
    } catch (error) {
        console.error(error);
    }
})();
