const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Reproduce una canción.'),
    async execute(interaction) {
        await interaction.reply(`Pong!`);
    },
};