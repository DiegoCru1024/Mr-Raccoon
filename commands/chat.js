const {SlashCommandBuilder} = require('discord.js');
const {guildUserModel} = require("../models/guildUserSchema");
const {GoogleGenerativeAI} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({model: "gemini-pro"});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chat')
        .setDescription('Inicia una conversación con Google Gemini.')
        .addStringOption(option => option.setName('message').setDescription('Ingresa tu mensaje.').setRequired(true)),
    async execute(interaction) {
        try {
            await interaction.deferReply()

            const userData = await guildUserModel.findOne({
                guildId: interaction.guild.id,
                userId: interaction.user.id
            });

            const msg = interaction.options.getString('message')
            const modelResponse = await sendMessage(msg, userData.chatHistory)

            if (userData.chatHistory.size === 1000) {
                userData.chatHistory.splice(0, 2);
            }

            userData.chatHistory.push({
                role: 'user',
                parts: msg
            }, {
                role: 'model',
                parts: modelResponse
            })

            await userData.save()

            await interaction.editReply(modelResponse);
        } catch (error) {
            console.error('Error al procesar el comando "chat":', error);
            return interaction.reply('Ocurrió un error al procesar el comando.');
        }
    },
};

async function sendMessage(msg, chatHistory) {
    const chat = model.startChat({
        history: chatHistory || [],
        generationConfig: {
            maxOutputTokens: 512,
        }
    })

    const result = await chat.sendMessage(msg);
    const response = await result.response;
    return response.text()
}