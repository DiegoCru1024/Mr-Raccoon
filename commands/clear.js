const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Limpia la cola porque hoy toca.'),
	async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction)
        
        if(queue) {
          interaction.reply(`Se ha limpiado la lista de reproducción.`)
          queue.stop()
        }
	},
};