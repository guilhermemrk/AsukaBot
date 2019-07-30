const DonatorCheck = (ayanami, Discord, m_db, moment, config) => {
    setTimeout(function(){
      db.each('SELECT * FROM donators', function(err, row){
        var now = moment()
        var timeLeft = moment(row.expireDate).diff(now, 'days');
        let username = row.username
        if (timeLeft >= 1){
          console.log(`${username} is still good to go~ (${timeLeft} days left)`)
        } else {
          // if get user has donator role do below // if not, just delete the entry
          db.get('SELECT * FROM donators WHERE userid=? and serverid=?', [row.userid, row.serverid], function(err, row){
              var guild = ayanami.guilds.get(row.serverid);
              var member = guild.members.get(row.userid);
              member.removeRole(config.donatorRole)
                .catch(console.error);
              console.log(`${username}'s subscription has expired.`);
              db.run('DELETE FROM donators WHERE userid=? and serverid=?', [row.userid, row.serverid]);
          })
        }
      })
      DonatorCheck(ayanami, Discord, m_db, moment);
    }, 24*60*60*1000)
}

module.exports = { DonatorCheck }
