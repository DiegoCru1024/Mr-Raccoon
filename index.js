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

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
        console.log(`[DEBUG] El comando en ${filePath} ha sido creado con el nombre ${command.data.name}`)
	} else {
		console.log(`[ALERTA] El comando en ${filePath} esta incompleto.`);
	}
}

client.on(Events.ClientReady, (botClient) => {
    console.log(`[DEBUG] ${botClient.user.username} esta operativo...`)
})

client.on(Events.MessageCreate, async (messageObject) => {
    if(messageObject.author.id === client.user.id) return;
    else{
        if(messageObject.content.toLowerCase().includes("uwu")){
            messageObject.channel.send("UwU")
        }
        if(messageObject.content.toLowerCase().includes("owo")){
            messageObject.channel.send("OwO")
        }
        if(messageObject.content.toLowerCase().includes("awa")){
            messageObject.channel.send("AwA")
        }
        if(messageObject.content.toLowerCase().includes("tito")){
            messageObject.channel.send("Tito chupapinga UwU")
        }
	if(messageObject.content.toLowerCase().includes("quieto")){
            messageObject.channel.send("Quieto es trolo ;-;")
        }
    }
})

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No existe el comando ${interaction.commandName}.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Error de ejecución.', ephemeral: true });
	}
});

client.login(process.env.botToken)
