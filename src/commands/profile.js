const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const profile = require("../models/profile");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("See the HyperTyper profile of a member")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user which description you want to see")
        .setRequired(false)
    ),

  async execute(interaction) {
    const userId = interaction.user.id;

    if (interaction.options.getUser("user")) {
      profile.findOne({ userId: interaction.options.getUser("user").id }).then(result => {
        if (!result) {
          const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Oops...")
            .setDescription("It seems like this user doesn't have a HyperTyper account yet.")
            .setTimestamp();

          interaction.reply({ embeds: [errorEmbed], ephemeral: true })
        } else {
          const profileEmbed = new MessageEmbed()
            .setColor("#2f3037")
            .setTitle(`${interaction.options.getUser("user").tag}'s profile`)
            .setThumbnail(interaction.options.getUser("user").avatarURL())
            .addFields([
              {
                name: "Description",
                value: `> ${result.description}`
              },
              {
                name: "XP",
                value: `${result.xp}`
              },
              {
                name: "Level",
                value: `${result.level}`
              },
              {
                name: "XP until next level",
                value: `${result.toNextLevel}`,
              },
              {
                name: "Global rank",
                value: `${result.globalRank}`,
              },
              {
                name: "Games played",
                value: `${result.gamesPlayed}`
              },
              {
                name: "HyperTyper account created",
                value: `> ${result.userSince}`,
              }
            ])
            .setTimestamp();

          interaction.reply({ embeds: [profileEmbed] });
        }
      })
    } else {
      profile.findOne({ userId }).then(result => {
        if (!result) {
          const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Oops...")
            .setDescription("It seems like this user doesn't have a HyperTyper account yet.")
            .setTimestamp();

          interaction.reply({ embeds: [errorEmbed], ephemeral: true })
        } else {
          const profileEmbed = new MessageEmbed()
            .setColor("#2f3037")
            .setTitle(`${interaction.user.tag}'s profile`)
            .setThumbnail(interaction.user.avatarURL())
            .addFields([
              {
                name: "Description",
                value: `> ${result.description}`
              },
              {
                name: "XP",
                value: `${result.xp}`
              },
              {
                name: "Level",
                value: `${result.level}`
              },
              {
                name: "XP until next level",
                value: `${result.toNextLevel}`,
              },
              {
                name: "Global rank",
                value: `${result.globalRank}`,
              },
              {
                name: "Games played",
                value: `${result.gamesPlayed}`
              },
              {
                name: "HyperTyper account created",
                value: `> ${result.userSince}`,
              }
            ])
            .setTimestamp();

          interaction.reply({ embeds: [profileEmbed] });
        }
      })
    }
  },
};
