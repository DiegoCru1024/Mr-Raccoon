const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Me voy UnU '),
	async execute(interaction) {
        interaction.reply("Saliendo del canal.")
        interaction.client.distube.voices.leave(interaction)
	},
};