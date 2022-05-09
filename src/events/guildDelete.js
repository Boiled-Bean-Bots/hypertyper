const guildProfile = require("../models/guildProfile");
module.exports = (guild) => {
    const {id} = guild;
    guildProfile.findOneAndDelete({guildId: id}, (err) => {
        if(err) return console.error(err);
        return;
    })
}