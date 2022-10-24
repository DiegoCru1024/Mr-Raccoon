const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('El señor mapache responde a tu pregunta UwU')
        .addStringOption(option =>
            option.setName("pregunta")
            .setDescription("Ingresa tu pregunta...").setRequired(true)),
	async execute(interaction) {
        const posibleAnswers = ["Shi UwU", "Si", "Claro que si", "Obvi bb", "Efectivamente", "Por supuesto",
        "Eso es tan verdadero como la misoginia de Ollanta", "Los astros dice que si.", "Sisas", "à", "Orita no jodas papi",
        "Pregunta más tarde OwO", "Más tarde te respondo", "Estoy ocupado con mis $was", "Quien sabe, porque yo no", "Tu crees?",
        "Soy un mapache, anda buscate una vida", "Quizas", "Talvez si talvez no", "Nuse UnU", "No", "Ño", "Mi pancito dice que no",
        "Negativo", "Nu", "Nel prro :v", "Jamas", "Eso es falso", "De ninguna manera", "No es posible"]
        index = Math.floor(Math.random() * 30)
		await interaction.reply(posibleAnswers[index]);
	},
};