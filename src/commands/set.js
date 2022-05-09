const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const profile = require("../models/profile");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set")
    .setDescription("Set an information for your global HyperTyper profile")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("description")
        .setDescription("Set your global profile description")
        .addStringOption((option) =>
          option
            .setName("content")
            .setDescription(
              "The description you want to add to your global profile"
            )
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    switch (interaction.options.getSubcommand()) {
      case "description": {
        profile.findOne({ userId: interaction.user.id }).then((result) => {
          if (!result) {
            new profile({
              userId: interaction.user.id,
              description: interaction.options.getString("content"),
              userSince: new Date(),
            }).save();

            const createdAccountEmbed = new MessageEmbed()
              .setColor("#2f3037")
              .setTitle("Account created")
              .setDescription(
                `You successfully created your HyperTyper account and set your description to: **${interaction.options.getString(
                  "content"
                )}**`
              )
              .setTimestamp();

            interaction.reply({
              embeds: [createdAccountEmbed],
              ephemeral: true,
            });
          } else {
            result.description = interaction.options.getString("content");
            result.save();

            const savedDescriptionEmbed = new MessageEmbed()
              .setColor("#2f3037")
              .setTitle("Set description")
              .setDescription(
                `You successfully set your new description to: **${interaction.options.getString(
                  "content"
                )}**`
              )
              .setTimestamp();

            interaction.reply({
              embeds: [savedDescriptionEmbed],
              ephemeral: true,
            });
          }
        });
      }
    }
  },
};
