const {guildUserModel} = require("../models/guildUserSchema")

async function xpController(guildId, userId) {
    try {
        const guildUserData = await guildUserModel.findOne({guildId: guildId, userId: userId})
        if (guildUserData) {
            guildUserData.userXp += Math.floor(Math.random() * 100)
            await guildUserData.save()
        }
    } catch (error) {
        console.error('Error al actualizar el gremio:', error)
        throw error
    }
}

module.exports = {xpController}
