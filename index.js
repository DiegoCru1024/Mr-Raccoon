const deployCommands = require("./deploy.js")
const {Client, Events, GatewayIntentBits, messageLink} = require("discord.js")
require("dotenv/config")

var uwuCount = 0

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

client.once(Events.ClientReady, (botClient) => {
    console.log(botClient.user.username + " esta operativo...")

    client.application.commands.set([
        {
            name: "8ball",
            description: "El señor mapache responde tus preguntas OwO",
            options: [{name: 'pregunta', description: 'Ingresa tu pregunta...', type: 3, required: true}]
        }
    ])
})

client.on(Events.MessageCreate, async(message) => {
    if(message.author.id === client.user.id){
        return
    }
    else {
        if(message.content.toLowerCase() === "uwu"){  
            message.channel.send("UwU")
        }
    }
})

client.on(Events.InteractionCreate, async(interactionEvent) => {
    if(interactionEvent.isCommand) {
        if(interactionEvent.commandName == "8ball") {
            const posibleAnswers = ["Es cierto.", "Es decididamente así.", "Sin lugar a dudas.", " Sí, definitivamente.",
            "Puedes confiar en ello.", "Como yo lo veo, sí.", "Lo más probable.", "Perspectiva buena.", "Sí.",
            "Las señales apuntan a que sí.", "Respuesta confusa, vuelve a intentarlo.", "Vuelve a preguntar más tarde.",
            "Mejor no decirte ahora.", "No se puede predecir ahora.", "Concéntrate y vuelve a preguntar.", "No cuentes con ello.",
            "Mi respuesta es no.", "Mis fuentes dicen que no.", "Las perspectivas no son muy buenas.", "Muy dudoso."]
            var index = Math.floor(Math.random() * 20)
            selectedAnswer = posibleAnswers[index];
            interactionEvent.reply(selectedAnswer)
        }
    }
})


client.login(process.env.botToken)