const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Salta una cancion.'),
	async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction)

        if (!queue) return interaction.reply(`La cola esta vacia.`)

        try {
            const song = await queue.skip()
           interaction.reply(`Saltando a:\n${song.name}`)
          } catch (e) {
            queue.stop()
            interaction.reply(`Se ha acabado la lista.`)
          }
	},
};