const DonatorAdd = (ayanami, Discord, message, args, m_db, m_default, config, moment, server, donatorRole) => {
  let username = ayanami.users.get(args[1])
  let entryDate = moment()
  let expireDate = entryDate.clone().add(args[3], 'month')
  // var user = guild.members.get(args[1])

  if (username == undefined || args[1] == undefined || args[2] == undefined || args[3] == undefined){
    let answer = m_default.BlankEmbed.BlankEmbed(ayanami, Discord, config, message, config.embedERRORColor, 'Invalid arguments.');
  } else {
    db.get('SELECT * FROM donators WHERE userid=? and serverid=?', [args[1], server], function(err, row){
      if (row == undefined){
        db.each("INSERT INTO donators (serverid, userid, username, entryDate, expireDate, timeBought, tier) VALUES (?, ?,?,?,?,?,?)", [server, args[1], username.tag, String(entryDate.format('YYYY-MM-DD')), String(expireDate.format('YYYY-MM-DD')), args[3], args[2]]);
        console.log(config.logSeparator);
        console.log(`Userid: ` + args[1]);
        console.log(`Username: ` + username.tag);
        console.log(`Entry date: ` + entryDate);
        console.log(`Expire date: ` + expireDate);
        console.log(`Time bought: ` + args[3]);
        console.log(`Tier: ` + args[2]);
        console.log();
        // user.addRole(donatorRole).catch(console.error);
        let answer = m_default.BlankEmbed.BlankEmbed(ayanami, Discord, config, message, config.embedOkColor, `User **${username.tag}** successfully added to the database!`);
      } else {
        let newExpireDate = moment(row.expireDate).add(args[3], 'month');
        let newTimeBought = parseInt(row.timeBought)+parseInt(args[3])
        // console.log(`newExpireDate: ${newExpireDate.format('YYYY-MM-DD')} | oldTimeBought: ${row.timeBought} | newTimeBought: ${newTimeBought}`);
        db.run('UPDATE donators SET expireDate=?, timeBought=?, tier=? WHERE userid=? and serverid=?', [newExpireDate.format('YYYY-MM-DD'), newTimeBought, args[2], args[1], server], function(err, row){
          let answer = m_default.BlankEmbed.BlankEmbed(ayanami, Discord, config, message, config.embedDonatorColor, `${args[3]*30} days successfully added to **${username.tag}**!`);
        })
      }
    })
  }
}

module.exports = { DonatorAdd }

// .donator [add] [userid] [tier] [time]
// .donator   0      1       2      3
