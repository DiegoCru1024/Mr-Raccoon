const {Client, GatewayIntentBits, Collection, Events, EmbedBuilder} = require("discord.js")
const {commandLoader, loadCommands} = require("./commandLoader")
const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
require("dotenv/config")

var express = require("express")
const play = require("./commands/play")
var app = express()


app.set(`port`, (process.env.PORT || 5000))

app.get(`/`, function (request, response){
    var result = "[Express] Aplicación en ejecución."
    response.send(result)
}).listen(app.get(`port`), function(){
    console.log("[Express] Aplicación en ejecución, servidor alojado en el puerto: " + app.get("port"))
})

const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ]
})

discordClient.distube = new DisTube(discordClient, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
      new SpotifyPlugin({
        emitEventsAfterFetching: true
      }),
    ]
  })

discordClient.once(Events.ClientReady, () => {
    console.log(`${discordClient.user.username} esta operativo...`)
    loadCommands(discordClient)
})

discordClient.on(Events.InteractionCreate, async (interactionEvent) => {
	if (!interactionEvent.isChatInputCommand()) return;
      
	const command = interactionEvent.client.commands.get(interactionEvent.commandName);

	try {
		await command.execute(interactionEvent);
	} catch (error) {
		console.error(error);
		await interactionEvent.reply({ content: 'Error de ejecución.', ephemeral: true });
	}
});

discordClient.on(Events.GuildMemberAdd, (guildMemberAddEvent) => {
    const member = guildMemberAddEvent
    const channel = discordClient.channels.cache.get("811323142248464466")
    const url = member.displayAvatarURL();
    const newRole = "811324312308416563"



    const newEmbed = new EmbedBuilder()
    .setTitle("**Un nuevo miembro ha aparecido!!!**")
    .setDescription(`Hola <@${member.id}> soy Mr. Raccoon y te doy la bienvenida a ${guildMemberAddEvent.guild}!`)
    .setColor(0xb300ff)
    .setImage(url)

    channel.send({embeds: [newEmbed]})
    guildMemberAddEvent.roles.add(newRole)
})

discordClient.distube.on("playSong", (queue, song) => {
    song = queue.songs[0]
    channel = discordClient.channels.cache.get("827673676857212948")
    channel.send(`**Reproduciendo:** ${song.name} \`(${song.formattedDuration})\``)
})
discordClient.login(process.env.botToken)

