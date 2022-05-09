const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");
const  guildP  = require("../models/guildProfile");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guild")
    .setDescription("Setup the bot for the current guild")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("language")
        .setDescription("Changes the language for the current guild")
    ),

  async execute(interaction, lang) {
    switch (interaction.options.getSubcommand()) {
      case "language": {
        const languageSelectEmbed = new MessageEmbed()
          .setColor("#2f3037")
          .setTitle(lang.guild.title)
          .setDescription(lang.guild.embeds.languageSelect.description)
          .setTimestamp();

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('ps-language')
                    .setPlaceholder("English")
                    .addOptions([ // FLAG EMOJI'S https://emojipedia.org/flag-germany/
                        {
                          label: 'English',
                          value: 'en_US',
                          emoji: '🇺🇸'
                        },
                        {
                          label: 'Nederlands',
                          value: 'nl_NL',
                          emoji: '🇳🇱'
                        },
                        {
                          label: "Deutsch",
                          value: "de_DE",
                          emoji: "🇩🇪"
                        },
                        {
                          label: 'Español',
                          value: 'es_ES',
                          emoji: '🇪🇸'
                        }
                    ]),
            );

        await interaction.reply({ embeds: [languageSelectEmbed],  components: [row]});
      }
    }
  },
};
