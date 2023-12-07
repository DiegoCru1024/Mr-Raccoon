const {guildUserModel} = require("../models/guildUserSchema");

async function verifyUser(botClient, guildId, userId) {
    try {
        const guildUserResponse = await guildUserModel.findOne({guildId: guildId, userId: userId});

        if (!guildUserResponse) {
            const guild = botClient.guilds.cache.get(guildId);
            const guildMember = guild.members.cache.get(userId);

            if (guildMember) {
                const joinDate = guildMember.joinedAt;

                await new guildUserModel({
                    guildId: guildId,
                    userId: userId,
                    joinDate: joinDate,
                    experience: 0,
                    currency: 0
                }).save();
            } else {
                throw new Error('El usuario no se encuentra en el servidor.');
            }
        }
    } catch (error) {
        console.error('Error al verificar al usuario:', error);
        throw error;
    }
}

module.exports = {verifyUser};
