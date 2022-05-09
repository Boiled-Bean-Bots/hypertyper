const { Schema, model } = require('mongoose');

const party = new Schema(
  {
    creatorId: {
      type: String,
      required: true,
    },
    invitedUserId: {
      type: String,
      required: true,
    },
    invitedUserTag: {
      type: String,
      required: true,
    },
    joinRequestAccepted: {
      type: Boolean,
      required: true,
      default: false,
    },
    creatorPoints: {
      type: Number,
      required: true,
      default: 0,
    },
    invitedPlayerPoints: {
      type: Number,
      required: true,
      default: 0,
    },
    currentRound: {
      type: Number,
      required: true,
      default: 0,
    },
    gameChannelId: {
      type: String,
      required: true,
    },
    partyEmbedId: {
      type: String,
      default: '',
    },
    currentWords: {
      type: String,
      required: false,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = model('party', party);
