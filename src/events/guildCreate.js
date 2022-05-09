const guildProfile = require("../models/guildProfile");
module.exports = (guild) => {
    const {id, name} = guild;
    guildProfile.findOne({guildId: id}, (err, results) => {
        if(err) return console.error(err);
        if(!results) return new guildProfile({guildId: id, guildName: name}).save();
        return;
    }) 
}