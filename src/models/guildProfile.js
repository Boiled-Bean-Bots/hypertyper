const { Schema, model } = require("mongoose");

const guildProfile = new Schema(
  {
    guildId: {
      type: String,
      required: true
    },
    guildName: {
      type: String,
      required: true
    },
    language: {
      type: String,  
      default: "en_EN",
      required: true
    },
  },
  { timestamps: true }
); 

module.exports = model("guildProfile", guildProfile);
