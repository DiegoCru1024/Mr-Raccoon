const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('Repito la lista.'),
	async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction)
        const mode = queue.repeatMode

        switch(mode.toString()){
            case "0":
                queue.setRepeatMode(2)
                interaction.reply("Se esta repitiendo la lista.")
                break;

            case "2":
                queue.setRepeatMode(0)
                interaction.reply("Se ha dejado de repetir la lista.")
                break;
        }
        
	},
};