const DonatorAdd = (client, message, args, m_db, m_default, config, moment, server) => {
  let username = client.users.get(args[1])
  let entryDate = moment()
  let expireDate = entryDate.clone().add(args[3], 'month')
  var guild = message.guild.id;
  var member = guild.members.get(args[1]);

  if (username == undefined || args[2] == undefined || args[3] == undefined){
    m_default.BlankEmbed.BlankEmbed(message, config.embedERRORColor, 'Invalid arguments.');
  } else {
    db.get('SELECT * FROM donators WHERE userid=? and serverid=?', [args[1], server], function(err, row){
      if (row == undefined){
        db.run("INSERT INTO donators (serverid, userid, username, entryDate, expireDate, timeBought, tier) VALUES (?, ?,?,?,?,?,?)", [server, args[1], username.tag, String(entryDate.format('YYYY-MM-DD')), String(expireDate.format('YYYY-MM-DD')), args[3], args[2]]);
        console.log(`Userid: ` + args[1]);
        console.log(`Username: ` + username.tag);
        console.log(`Entry date: ` + entryDate);
        console.log(`Expire date: ` + expireDate);
        console.log(`Time bought: ` + args[3]);
        console.log(`Tier: ` + args[2]);
        console.log();

        if (!member.roles.has('590384740989796392')){ member.addRole('590384740989796392').catch(console.error); }
        if (!member.roles.has('605482684625453056')){ member.addRole('605482684625453056').catch(console.error); }
        if (!member.roles.has('605482688316440599')){ member.addRole('605482688316440599').catch(console.error); }

        m_default.BlankEmbed.BlankEmbed(message, config.embedOkColor, `User **${username.tag}** successfully added to the database!`);
      } else {
        let newExpireDate = moment(row.expireDate).add(args[3], 'month');
        let newTimeBought = parseInt(row.timeBought)+parseInt(args[3])
        db.run('UPDATE donators SET expireDate=?, timeBought=?, tier=? WHERE userid=? and serverid=?', [newExpireDate.format('YYYY-MM-DD'), newTimeBought, args[2], args[1], server], function(err, row){
          m_default.BlankEmbed.BlankEmbed(message, config.embedDonatorColor, `${args[3]*30} days successfully added to **${username.tag}**!`);
        })
      }
    })
  }
}

module.exports = { DonatorAdd }

// .donator [add] [userid] [tier] [time]
// .donator   0      1       2      3
