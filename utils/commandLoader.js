const fs = require('fs');
const path = require('path');
const ascii = require('ascii-table');
const {Collection} = require('discord.js');
const table = new ascii().setHeading("Comando", "Estado");

function loadCommands(botClient) {
    botClient.commands = new Collection();

    const commandsPath = path.resolve(__dirname, '..', 'commands'); // Retrocede un nivel para acceder a 'commands'
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        try {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            console.log(filePath);

            if (command && 'data' in command && 'execute' in command) {
                botClient.commands.set(command.data.name, command);
                table.addRow(file, "Exito");
            } else {
                table.addRow(file, "Error: Estructura de comando inválida");
            }
        } catch (error) {
            table.addRow(file, `Error al cargar comando: ${error.message}`);
        }
    }
    console.log(table.toString());
}

module.exports = {loadCommands};
