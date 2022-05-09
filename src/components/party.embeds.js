const { MessageEmbed } = require("discord.js");
module.exports = {
    startEmbed(username, id, lang) {
        const startEmbed = new MessageEmbed()
          .setColor("#2f3037")
          .setTitle(lang.party.embeds.start.title)
          .setDescription(`${lang.party.embeds.start.description[0]} ${username} ${lang.party.embeds.start.description[1]} <#${id}>.`)
          .setTimestamp();
        return startEmbed;
    },
    statusEmbed(tag, lang) {
        const statusEmbed = new MessageEmbed() 
          .setColor("#2f3037")
          .setTitle(lang.party.embeds.status.title)
          .addFields([
            {
              name: lang.party.embeds.status.fields[0].name,
              value: `${tag}`,
            },
            {
              name: lang.party.embeds.status.fields[1].name,
              value: `<a:loading:970060962671505428> ${lang.party.embeds.status.fields[1].value}`,
            }
          ])
          .setTimestamp();
        return statusEmbed;
    },
    statusAcceptedEmbed(tag, isInvitedTag, hasAccepted, lang) {
      console.log(lang)
        const statusAcceptedEmbed = new MessageEmbed() 
          .setColor("#2f3037")
          .setTitle(lang.party.embeds.statusAccepted.title)
          .addFields([
            {
              name: lang.party.embeds.statusAccepted.fields[0].name,
              value: `<@${tag}>`,
            },
            {
              name: lang.party.embeds.statusAccepted.fields[1].name,
              value: hasAccepted ? `<a:checkmark:971070308821901383> ${isInvitedTag} ${lang.party.embeds.statusAccepted.fields[1].value[0]}` : `<a:cancel:971069851303022602> ${isInvitedTag} ${lang.party.embeds.statusAccepted.fields[1].value[1]}`,
            }
          ])
          .setTimestamp();
        return statusAcceptedEmbed;
    },
    noPartyCreatedEmbed(lang) {
      const noPartyCreatedEmbed = new MessageEmbed()
      .setColor("RED")
      .setTitle(lang.party.embeds.noPartyCreated.title)
      .setDescription(lang.party.embeds.noPartyCreated.description)
      .setTimestamp();

      return noPartyCreatedEmbed;
    },
    partyDisbannedEmbed(lang) {
      const partyDisbannedEmbed = new MessageEmbed()
        .setColor("#2f3037")
        .setTitle(lang.party.embeds.partyDisbanned.title)
        .setDescription(lang.party.embeds.partyDisbanned.description)
        .setTimestamp();    

      return partyDisbannedEmbed;
    },
    alreadyInPartyEmbed(lang) {
      const alreadyInParty = new MessageEmbed()
        .setColor("RED")
        .setTitle(lang.party.embeds.alreadyInParty.title)
        .setDescription(lang.party.embeds.alreadyInParty.description)
        .setTimestamp();

      return alreadyInParty;
    }
}