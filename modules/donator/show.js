const DonatorShow = (message, args, config, m_db, moment, server) => {
  db.each("SELECT * FROM donators WHERE userid=? and serverid=?", [args[1], server], function(err, row) {
    var a = row.id, b = row.userid, c = row.username, d = row.entryDate, e = row.expireDate, f = row.timeBought, g = row.tier;
    var now = moment()
    var timeLeft = moment(row.expireDate).diff(now, 'days');
    const dShow = {
  "title": `${c}'s Donator Status`,
  "color": config.embedDonatorColor,
  "footer": {
    "text": `DB ID: ${a}`
  },
  "fields": [
    {
      "name": "ID",
      "value": `${b}`,
      "inline": true
    },
    {
      "name": "Username",
      "value": `${c}`,
      "inline": true
    },
    {
      "name": "Entry date",
      "value": `${moment(d).format('DD-MM-YYYY')} (~${timeLeft} days left)`,
      "inline": true
    },
    {
      "name": "Expire date",
      "value": `${moment(e).format('DD-MM-YYYY')}`,
      "inline": true
    },
    {
      "name": "Time bought",
      "value": `${f*30} days`,
      "inline": true
    },
    {
      "name": "Tier",
      "value": `Donator ${g}`,
      "inline": true
    }
  ]
}
  message.channel.send({embed: dShow});
  });
}

module.exports = { DonatorShow }
