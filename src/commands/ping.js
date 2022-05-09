const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns the bot's ping status"),

  async execute(interaction, client, lang) {
    const pingembed = new MessageEmbed()

      .setColor("#2f3037")
      .setTitle(lang.ping.titlep)
      .addFields(
        {
          name: `${lang.ping.title}`,
          value: `> **${Math.round(client.ws.ping)}**ms`,
          inline: false,
        }
      )
      .setTimestamp();

    await interaction.reply({
      embeds: [pingembed]
    });
  },
};
