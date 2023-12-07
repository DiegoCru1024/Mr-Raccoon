const mongoose = require('mongoose')

const guildUserSchema = new mongoose.Schema({
    guildId: {type: Number, required: true},
    userId: {type: Number, required: true},
    joinDate: {type: Date, required: true},
    experience: {type: Number},
    currency: {type: Number},
    lastDaily: {type: Date},
})

const guildUserModel = mongoose.model("guildUser", guildUserSchema)

module.exports = {guildUserModel}