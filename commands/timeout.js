const {SlashCommandBuilder} = require('discord.js');
const {guildUserModel} = require("../models/guildUserSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Le das un timeout a la persona elegida (10 CosmicCoins por minuto)')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Usuario a quien suspender')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('time')
                .setDescription('Tiempo en minutos')
                .setMinValue(1)
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const target = interaction.options.getMember('user')
            const time = interaction.options.getInteger('time')
            const userData = await guildUserModel.findOne({guildId: interaction.guild.id, userId: interaction.user.id})

            if (target.user.bot) {
                return await interaction.reply('No puedes usar el comando en un bot.');
            }

            if (target.user.id === interaction.user.id) {
                return await interaction.reply('No puedes usar el comando en ti mismo.')
            }

            if (target.permissions.toArray().includes('Administrator')) {
                return await interaction.reply('No puedes banear a un administrador.')
            }

            if (userData) {
                const userBalance = userData.currency

                if (userBalance < time * 10) {
                    return await interaction.reply('No tienes suficientes CosmicCoins.')
                }

                userData.currency -= time * 10;
                await userData.save();

                target.timeout(time * 60000)
                await interaction.reply(`Se suspendio a ${target.user.username} por ${time} minutos.`);
            }
        } catch (error) {
            console.log(error)
            await interaction.reply('Ocurrió un error al procesar el comando.')
        }
    },
};