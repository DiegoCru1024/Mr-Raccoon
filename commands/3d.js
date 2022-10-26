const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('3d')
		.setDescription('Activa/Desactiva el modo 3D.'),
	async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction)

        if(queue.filters.has("3d")){
            queue.filters.remove("3d")
            return interaction.reply("Se ha quitado el filtro 3D")
        } else {
            queue.filters.add("3d")
            return interaction.reply("Se ha aplicado el filtro 3D")
        }
	},
};