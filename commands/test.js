const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Comando de prueba'),
    async execute(interaction) {
        let arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push(i);
        }
        await interaction.reply(arr.toString()); // or JSON.stringify(arr)
    },
};
