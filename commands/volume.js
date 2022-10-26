const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Cambia el volumen.')
        .addIntegerOption(option => 
            option.setName("volumen")
            .setDescription("Ingresa el porcentaje de volumen.")
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(true)
        ),
	async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction)
        queue.setVolume(interaction.options.getInteger("volumen"))
        interaction.reply(`Se ha cambiado el volumen a ${interaction.options.getInteger("volumen")}%.`)
	},
};