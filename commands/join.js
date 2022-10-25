const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Me uno UwU'),
	async execute(interaction) {
        interaction.reply("Entrando al canal.")
        interaction.client.distube.voices.join(interaction.member.voice.channel)
	},
};