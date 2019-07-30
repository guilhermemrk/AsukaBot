const DonatorList = (message, m_db, m_default, config, moment) => {
  // m_default.BlankEmbed.BlankEmbed(message, config.embedOkColor, `Database logged to the console.`)
  var fullMessage = 'Donator list\n\n';

  db.all("SELECT * FROM donators", function(err, rows) {
    if (err) console.log(err);


  rows.forEach((row) => {
    var now = moment()
    var timeLeft = moment(row.expireDate).diff(now, 'days');
    var entryid = row.id, userid = row.userid, username = row.username, entryDate = row.entryDate, expireDate = row.expireDate, timeBought = row.timeBought, tier = row.tier;
    fullMessage += `UserID: ${userid} | Username: ${username} | Entry Date: ${moment(entryDate).format('DD-MM-YYYY')} | Exp. Date: ${moment(expireDate).format('DD-MM-YYYY')} | Time Left: ${timeLeft} days | Time Bought: ${timeBought*30} days | Tier: ${tier}\n`;
  });
    if (fullMessage.length <= 17){ fullMessage += 'No one ;-;'; }
    message.channel.send(fullMessage);
  });

}

module.exports = { DonatorList }
