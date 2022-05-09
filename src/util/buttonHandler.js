const party = require('../models/party');
const { MessageEmbed } = require('discord.js');
const { client } = require('../index');
const { statusAcceptedEmbed } = require('../components/party.embeds');
const guildProfile = require('../models/guildProfile');

module.exports = async (interaction, lang) => {
  // Buttons
  if (interaction.customId === '966803967273205780-accept') {
    party
      .findOne({ invitedUserId: interaction.user.id })
      .then(async (result) => {
        if (!result) {
          const errorEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Oops...')
            .setDescription('This invitation has already expired. Sorry!')
            .setTimestamp();
          interaction.reply({ embeds: [errorEmbed] });
        } else {
          result.joinRequestAccepted = true;
          result.save();
          const gameChannel = await client.channels.cache.get(
            result.gameChannelId
          );
          const partyEmbed = await gameChannel.messages.fetch(
            result.partyEmbedId
          );

          partyEmbed.edit({
            embeds: [
              statusAcceptedEmbed(
                result.creatorId,
                result.invitedUserTag,
                true,
                lang
              ),
            ],
          });

          const acceptedEmbed = new MessageEmbed()
            .setColor('#2f3037')
            .setTitle('Joined!')
            .setDescription('You successfully joined the game!')
            .setTimestamp();

          interaction.reply({ embeds: [acceptedEmbed] });
        }
      });
  }

  if (interaction.customId === '966803967273205780-decline') {
    party
      .findOne({ invitedUserId: interaction.user.id })
      .then(async (result) => {
        if (!result) {
          const errorEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Oops...')
            .setDescription('This invitation has already expired. Sorry!')
            .setTimestamp();
          interaction.reply({ embeds: [errorEmbed] });
        } else {
          const gameChannel = await client.channels.cache.get(
            result.gameChannelId
          );
          const partyEmbed = await gameChannel.messages.fetch(
            result.partyEmbedId
          );
          partyEmbed.edit({
            embeds: [
              statusAcceptedEmbed(
                result.creatorId,
                result.invitedUserTag,
                false,
                lang
              ),
            ],
          });
          const declineEmbed = new MessageEmbed()
            .setColor('#2f3037')
            .setTitle('Declined!')
            .setDescription('You declined the game invitation!')
            .setTimestamp();
          interaction.reply({ embeds: [declineEmbed] });
        }
        collector.stop();
      });
  }

  // Select Menus
  if (interaction.customId === 'ps-language') {
    if (interaction.user.id === interaction.guild.ownerId) {
      const languageSelectError = new MessageEmbed()
        .setColor('RED')
        .setTitle('Oops...')
        .setDescription(
          "You don't have permission to change the language in this server!"
        )
        .setTimestamp();

      await interaction.reply({
        embeds: [languageSelectError],
        ephemeral: true,
      });
    } else {
      const selectedValue = interaction.values[0];

      console.log(selectedValue);

      // Set default language text
      let selectedLanguage;
      switch (selectedValue) {
        case 'en_EN': {
          selectedLanguage = 'English';
          break;
        }
        case 'nl_NL': {
          selectedLanguage = 'Nederlands';
          break;
        }
        case 'de_DE': {
          selectedLanguage = 'Deutsch';
          break;
        }
        case 'es_ES': {
          selectedLanguage = 'Español';
          break;
        }
        default: {
          selectedLanguage = 'English';
        }
      }

      guildProfile
        .findOne({ guildId: interaction.guildId })
        .then((result) => {
          result.language = selectedValue;
          result.save();
        })
        .catch((err) => console.log(err));

      const languageSelectEmbed = new MessageEmbed()
        .setColor('#2f3037')
        .setTitle('Language')
        .setDescription(
          `Successfully changed the language of your server to **${selectedLanguage}**.`
        )
        .setTimestamp();

      await interaction.update({
        embeds: [languageSelectEmbed],
        components: [],
      });
    }
  }
};
