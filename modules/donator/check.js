const DonatorCheck = (client, Discord, m_db, moment, config, time) => {
    setTimeout(function(){
      db.each('SELECT * FROM donators', function(err, row){
        var now = moment()
        var timeLeft = moment(row.expireDate).diff(now, 'days');
        let username = row.username
        if (timeLeft >= 1){
          console.log(`${username} is still good to go~ (${timeLeft} days left)`)
        } else {
          db.get('SELECT * FROM donators WHERE userid=? and serverid=?', [row.userid, row.serverid], function(err, row){
              var guild = client.guilds.get(row.serverid);
              var member = guild.members.get(row.userid);

              if (member.roles.has(config.dtier1)){ member.removeRole(config.dtier1).catch(console.error); }
              if (member.roles.has(config.dtier2)){ member.removeRole(config.dtier2).catch(console.error); }
              if (member.roles.has(config.dtier3)){ member.removeRole(config.dtier3).catch(console.error); }
              console.log(`${username}'s subscription has expired.`);
              // var donatorEnded = {
              //     "title": "Your subscription ended!",
              //     "description": "Heyo! Your subscription to the HENTAI server just ended T_T\nThank you for all your support until now!\n",
              //     "color": 5594879
              //   }
              // client.users.get('210528791716429825').send({embed: donatorEnded});
              db.run('DELETE FROM donators WHERE userid=? and serverid=?', [row.userid, row.serverid]);
          })
        }
      })
      DonatorCheck(client, Discord, m_db, moment, config, time);
    }, time)
}

module.exports = { DonatorCheck }
