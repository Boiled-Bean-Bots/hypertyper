const { readdirSync } = require("fs");
const guildProfile = require("../models/guildProfile.js")

module.exports = async (interaction) => {
  const client = interaction.client;
  var lang;

  // Trying to find the guild language config
  try {
    await guildProfile.findOne({ guildId: interaction.guildId }).then(result => {
      lang = require(`../languages/${result.language}`);
    }).catch(err => interaction.reply({ content: "Something went wrong! :(" }));
  } catch (err) {
    if (err) console.error(err);
    interaction.reply({
      content: "An error occurred while executing that command.",
      ephemeral: true,
    });
  }

  // Setting english as default language, if guild has no language selected
  if(!lang) lang = require(`../languages/en_EN.json`);

  // Import button handler
  require("../util/buttonHandler")(interaction, lang);

  // Command handler
  const commandFiles = readdirSync("./src/commands/").filter((file) =>
    file.endsWith(".js")
  );
  const commands = [];
  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
  }
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  command.execute(interaction, client, lang);
};
