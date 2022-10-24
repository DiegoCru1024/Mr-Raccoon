const fs = require('node:fs');
const path = require('node:path');
const {Client, Events, GatewayIntentBits, Collection} = require("discord.js")
require("dotenv/config")

const client = new Client({
    intents: [
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ]
})

client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commandHandler');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
        console.log(`[DEBUG] El comando en ${filePath} ha sido creado con nombre ${command.data.name}`)
	} else {
		console.log(`[ALERTA] En comando en ${filePath} esta incompleto.`);
	}
}

client.once(Events.ClientReady, (botClient) => {
    console.log(botClient.user.username + " esta operativo...")
})

client.on(Events.MessageCreate, async(message) => {
    if(message.author.id === client.user.id){
        return
    }
    else {
        if(message.content.toLowerCase().includes("uwu")){  
            message.channel.send("UwU")
        }
    }
})

client.on(Events.InteractionCreate, async(interaction) => {
    if(!interaction.isCommand) {
        console.log("[Debug] Esto no es un comando.")
        return;
    }
    else {
        const command = interaction.client.commands.get(interaction.commandName);

	    if (!command) {
		    console.error(`No existe el comando ${interaction.commandName}.`);
		    return;
	    }

	    try {
		    await command.execute(interaction);
	    } catch (error) {
		    console.error(error);
		    await interaction.reply({ content: 'Erros de ejecución.', ephemeral: true });
	    }
    }
})


client.login(process.env.botToken)