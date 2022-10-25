const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Reproduce una cancion')
        .addStringOption(option => 
            option.setName("query")
            .setDescription("Ingresa el nombre o link de la cancion.")
            .setRequired(true)
        ),      
    async execute (interaction) {
        const query = interaction.options.getString("query")
        let queue = interaction.client.distube.getQueue(interaction)

        if(!queue){  
            interaction.client.distube.play(interaction.member.voice.channel, query, {
                member: interaction.member,
                textChannel: interaction.channel,
                interaction      
            })
            lastPlay = interaction.channel
            interaction.reply(`Cancion añadida.`)
        } else {
            interaction.client.distube.play(interaction.member.voice.channel, query, {
                member: interaction.member,
                textChannel: interaction.channel,
                interaction      
            })
            lastPlay = interaction.channel
            interaction.reply(`La cancion se ha añadido a la cola.`)
            
        }
    }
  }