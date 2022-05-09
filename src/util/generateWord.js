const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const party = require("../models/party");

async function generateRandomWord() {
  const numOfWords = Math.floor(Math.random() * 9) + 1;

  let data = await fetch(
    `https://random-word-api.herokuapp.com/word?number=${numOfWords}`
  ).then((res) => res.json());
  return data;
}

module.exports = async (interaction) => {
  let words = await generateRandomWord();

  Promise.all(words).then((results) => {
    const protectedText = results.length > 1 ? results.join('‎ ') : `${results[0]}‎`;
    const wordEmbed = new MessageEmbed()
      .setColor('#2f3037')
      .setTitle('Type the word(s)')
      .setDescription(protectedText)
      .setTimestamp();
    // Update the party
    party.findOne({ creatorId: interaction.user.id }).then(result => {
      if (!result) {
        console.log("error");
      } else {
        result.currentRound = result.currentRound++;
        result.currentWord = results.join(' ');
        result.save();
      }
    });
    interaction.channel.send({ embeds: [wordEmbed] });
  });
};
