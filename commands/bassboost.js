const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`bassboost`)
		.setDescription('Activa/Desactiva el modo BassBoost.'),
	async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction)

        if(queue.filters.has("bassboost")){
            queue.filters.remove("bassboost")
            return interaction.reply("Se ha quitado el filtro BassBoost")
        } else {
            queue.filters.add("bassboost")
            return interaction.reply("Se ha aplicado el filtro BassBoost")
        }
	},
};