const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('Randomiza la lista.'),
	async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction)
        
        if(queue) {
          interaction.reply(`Se ha randomizado la lista`)
          queue.shuffle()
        }
	},
};