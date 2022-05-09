const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  User,
} = require("discord.js");
const { startEmbed, statusEmbed, noPartyCreatedEmbed, partyDisbannedEmbed, alreadyInPartyEmbed } = require("../components/party.embeds");
const { expireParty } = require("../components/expire.party");
const party = require("../models/party");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("party")
    .setDescription("Invites a player to the party")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("invite")
        .setDescription("Invite a member to the party")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("The user you want to play with")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("disband").setDescription("Disband the current party")
    ),
 
  async execute(interaction, client, lang) {
    switch (interaction.options.getSubcommand()) {
      case "invite": {
        const user = await client.users.fetch(interaction.options.getUser("user"));
        // Check if user already has a party
        const isActive = await party.findOne({ creatorId: interaction.user.id });
    
        if (isActive) {
          return interaction.reply({ embeds: [alreadyInPartyEmbed(lang)] });
        }

        // Invitation embed buttons
        const row = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("966803967273205780-accept")
            .setLabel(`${lang.party.buttons.accept}`)
            .setStyle("SUCCESS")
            .setEmoji("✅"),
          new MessageButton()
            .setCustomId("966803967273205780-decline")
            .setLabel(`${lang.party.buttons.decline}`)
            .setStyle("SECONDARY")
            .setEmoji("❌")
        );

        // Create Party in database
        new party({
          creatorId: interaction.user.id,
          invitedUserId: interaction.options.getUser("user").id,
          invitedUserTag: interaction.options.getUser("user").tag,
          gameChannelId: interaction.channel.id || interaction.channelId,
        }).save();
    
        // Send embed & buttons to invited player (embed creation moved to new file ../components/party.embeds.js)
        user.send({
          embeds: [startEmbed(interaction.user.username, interaction.channel.id, lang)],
          components: [row],
        });

        // Send status embed to party owner (embed creation moved to new file ../components/party.embeds.js)
        interaction.reply({ embeds: [statusEmbed(interaction.user.tag, lang)] });
        interaction
          .fetchReply()
          .then(({ id }) => {
            party.findOneAndUpdate(
              { creatorId: interaction.user.id },
              { partyEmbedId: `${id}` },
              (err) => {
                if (err) throw err;
              }
            );
          })
          .catch((err) => console.error(err));
    
        expireParty(party, interaction.user.id);

        break;
      }

      case "disband": {
        party.findOne({ creatorId: interaction.user.id }).then(result => {
          if (!result) {
            interaction.reply({ embeds: [noPartyCreatedEmbed(lang)], ephemeral: true });
          } else {
            party.findOneAndDelete({ creatorId: interaction.user.id }).then(() => {
              interaction.reply({ embeds: [partyDisbannedEmbed(lang)], ephemeral: true })
            }).catch(err => console.log(err));
          }
        }).catch(err => console.log(err));

        break;
      }
    }
  },
};
