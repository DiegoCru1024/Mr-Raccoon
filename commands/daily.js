const {SlashCommandBuilder} = require('discord.js');
const {guildUserModel} = require("../models/guildUserSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Recibe tu recompensa diaria.'),
    async execute(interaction) {
        try {
            const userData = await guildUserModel.findOne({guildId: interaction.guild.id, userId: interaction.user.id});
            const lastDailyTime = userData?.lastDaily || 0;
            const dailyRange = 24 * 60 * 60 * 1000;
            const elapsedTime = Date.now() - lastDailyTime;

            if (elapsedTime >= dailyRange) {
                let currencyReward = 0;
                const randomProbability = Math.random() * 100;

                if (randomProbability < 80) {
                    currencyReward = Math.floor(Math.random() * (250 - 150 + 1)) + 150;
                } else if (randomProbability < 95) {
                    currencyReward = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
                } else if (randomProbability < 99) {
                    currencyReward = Math.floor(Math.random() * (850 - 700 + 1)) + 700;
                } else {
                    currencyReward = Math.floor(Math.random() * (1500 - 1000 + 1)) + 1000;
                }

                if (userData) {
                    userData.currency += currencyReward;
                    userData.lastDaily = Date.now();
                    await userData.save();
                    return interaction.reply(`¡Recompensa diaria recibida! Has ganado ${currencyReward} Cosmic Coins.`);
                }
            } else {
                const remainingTime = dailyRange - elapsedTime;
                const remainingHours = Math.floor(remainingTime / (60 * 60 * 1000));
                const remainingMinutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
                return interaction.reply(`¡Ya has recibido tu recompensa diaria! Vuelve en ${remainingHours} horas y ${remainingMinutes} minutos.`);
            }
        } catch (error) {
            console.error('Error al procesar el comando "daily":', error);
            return interaction.reply('Ocurrió un error al procesar el comando.');
        }
    },
};
