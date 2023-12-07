const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const {guildUserModel} = require("../models/guildUserSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wallet')
        .setDescription('Te muestra la información de tu billetera.'),
    async execute(interaction) {
        try {
            const {currency} = await guildUserModel.findOne({
                guildId: interaction.guild.id,
                userId: interaction.user.id
            });

            if (currency) {
                const walletEmbed = new EmbedBuilder()
                    .setColor(0x6400c8)
                    .setTitle(`Billetera de ${interaction.user.username}`)
                    .setDescription(`Tienes ${currency} Cosmic Coins :raccoon:`)
                    .setThumbnail(interaction.user.avatarURL())
                await interaction.reply({embeds: [walletEmbed]})
            }
        } catch (error) {
            console.error('Error al procesar el comando "wallet":', error);
            return interaction.reply('Ocurrió un error al procesar el comando.');
        }
    },
};