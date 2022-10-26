const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Muestra la lista de reproducción.'),
    async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction)
        const embedText = []

        if (!queue) return interaction.reply("No hay canciones en reproducción.")

        const songArray = queue.songs.map((song) => `${song.name}`)

        if (!songArray[1]) {
            embedText[0] = `No hay canciones en cola.`
        } else {
            for (var i = 0; i < 10; i++) {
                if (songArray[i + 1]) {
                    embedText[i] = `${i + 1} - ${songArray[i + 1]} \n `
                } else break
            }
        }

        if(Object.keys(songArray).length >=12){
            embedText[10] = `**Hay ${Object.keys(songArray).length-11} canciones más...**`

        }

        fixedText = embedText.toString().replace(new RegExp(",", "g"), '')

        const queueEmbed = new EmbedBuilder().setTitle("**Lista de reproducción:**").setColor(0xb300ff)
            .addFields(
                { name: "Reproduciendo ahora:", value: `${songArray[0]}` },
                { name: "En cola:", value: fixedText }
            )

        interaction.reply({ embeds: [queueEmbed] })
    },
};