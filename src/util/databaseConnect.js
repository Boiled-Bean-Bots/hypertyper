const mongoose = require("mongoose");
const { ChalkAdvanced } = require("chalk-advanced");
require("dotenv").config();

async function loadDB() {
  await mongoose
    .connect(process.env.MONGO_URI, {
      keepAlive: true,
    })
    .then(() =>
      console.log(
        `${ChalkAdvanced.white("HyperTyper")} ${ChalkAdvanced.gray(
          ">"
        )} ${ChalkAdvanced.green("Database connected")}`
      )
    )
    .catch((err) => console.log(ChalkAdvanced.red(err)));
};

module.exports = { loadDB };