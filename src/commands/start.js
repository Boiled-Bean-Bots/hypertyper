const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const party = require('../models/party');
const generateWord = require('../util/generateWord');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Start a game in a party'),

  async execute(interaction) {
    // Check if the user has a party
    party.findOne({ creatorId: interaction.user.id }).then(async (result) => {
      if (!result) {
        // User doesn't have a party
        const noPartyError = new MessageEmbed()
          .setColor('RED')
          .setTitle('Oops...')
          .setDescription(
            "You're not in a party right now or not the party owner. Create a party with **/party** or wait until the party leader starts the game."
          )
          .setTimestamp();

        interaction.reply({ embeds: [noPartyError], ephemeral: true });
      } else {
        // User has a party
        if (result.joinRequestAccepted) {
          // User's opponent has accepted the join request

          // GAME PROCESS
          // Introduction
          const gameStartedEmbed = new MessageEmbed()
            .setColor('#2f3037')
            .setTitle("Let's go!")
            .setDescription('You successfully started the game.')
            .setTimestamp();

          const introductionEmbed = new MessageEmbed()
            .setColor('#2f3037')
            .setTitle('Introduction')
            .setDescription(
              "The game is simple. The bot sends a word or word group in the channel, and whoever types it faster wins. And: Don't try to copy the word from the bot, that doesn't work. :)"
            )
            .setTimestamp();

          interaction.reply({ embeds: [gameStartedEmbed], ephemeral: true });
          interaction.channel.send({ embeds: [introductionEmbed] });

          // Game
          // First round
          generateWord(interaction);

          // Final score + upgrading profiles (XP, Level)
        } else {
          // User's opponent didn't accept yet
          const opponentDidntAcceptError = new MessageEmbed()
            .setColor('RED')
            .setTitle('Oops...')
            .setDescription(
              "You can't start the game until your invited player accepts the request."
            )
            .setTimestamp();

          interaction.reply({
            embeds: [opponentDidntAcceptError],
            ephemeral: true,
          });
        }
      }
    });
  },
};
