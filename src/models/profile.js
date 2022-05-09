const { Schema, model } = require('mongoose');

const profile = new Schema({
  userId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: "This user has no description yet", 
  },
  xp: {
    type: Number,
    required: true,
    default: 0
  },
  level: {
    type: Number,
    required: true,
    default: 0
  },
  toNextLevel: {
    type: Number,
    required: true,
    default: 100
  },
  globalRank: {
    type: String,
    required: false,
    default: "Not ranked yet"
  },
  badges: {
    type: Array,
    required: false
  },
  gamesPlayed: {
    type: Number,
    required: true,
    default: 0
  },
  userSince: {
    type: Date,
    required: true
  },
  inGame: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true });

module.exports = model('profile', profile);