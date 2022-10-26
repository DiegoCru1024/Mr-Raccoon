const fs = require('node:fs');
const path = require('node:path');
const ascii = require('ascii-table')
const {Collection} = require('discord.js');
const table = new ascii().setHeading("Comando", "Estado")

module.exports = {
    loadCommands : function(botClient){
        botClient.commands = new Collection();

        const commandsPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {  
	        const filePath = path.join(commandsPath, file);
	        const command = require(filePath);

	        if ('data' in command && 'execute' in command) {
		        botClient.commands.set(command.data.name, command);
                table.addRow(file, "Exito")
	        } else {
                table.addRow(file, "Error")
	        }
        }
        return console.log(table.toString())
    }
}