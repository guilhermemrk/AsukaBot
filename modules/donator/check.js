const DonatorCheck = (client, Discord, m_db, moment) => {
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
              if (member.roles.has('590384740989796392')){ member.removeRole('590384740989796392').catch(console.error); }
              if (member.roles.has('605482684625453056')){ member.removeRole('605482684625453056').catch(console.error); }
              if (member.roles.has('605482688316440599')){ member.removeRole('605482688316440599').catch(console.error); }
              console.log(`${username}'s subscription has expired.`);
              db.run('DELETE FROM donators WHERE userid=? and serverid=?', [row.userid, row.serverid]);
          })
        }
      })
      DonatorCheck(client, Discord, m_db, moment);
    }, 5000)
}

module.exports = { DonatorCheck }
