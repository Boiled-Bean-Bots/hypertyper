const minutes = 1;
const expireParty = (party, id) => {
    setTimeout(() => {
        party.findOne({ creatorId: id }).then(result => {
            if (!result) {
              return;
            } else {
              if (!result.joinRequestAccepted) {
                party.findOneAndDelete({ creatorId: id }, (err) => {
                  if(err) return console.error(err);
                  return;
                })
              }
            }
            return;
        });
    }, 1000 * 60 * minutes);
}
module.exports.expireParty = expireParty;