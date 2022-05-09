/* Requiring the needed libraries */
const { Collection, Client } = require("discord.js");
require("dotenv").config();

/* It's creating a new client with the needed intents. */
const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_INTEGRATIONS",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGES",
    "GUILD_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING",
  ],
});

module.exports = { client };

/* Basically loading the event and command loader ironic right */
require("./util/eventLoader")(client);


/* It's creating a new collection for the commands. */
client.commands = new Collection();

/* Logging the bot in. */
client.login(process.env.TOKEN);