const DonatorRemove = (message, args, m_db, m_default, config) => {
  if (args[1] == undefined){
    m_default.BlankEmbed.BlankEmbed(message, config.embedERRORColor, 'Invalid arguments.');
  } else {
    var server = message.guild.id;
    db.get('SELECT * FROM donators WHERE userid=? AND serverid=?', [args[1], server], function(err, select){
      if (select !== undefined){
        db.run('DELETE FROM donators WHERE userid=? AND serverid=?', [args[1], server], function(err, row){
          var guild = message.guild;
          var member = guild.members.get(select.userid);

          console.log(`${select.username}'s subscription got manually removed.`);

          if (member.roles.has(config.dtier1)){ member.removeRole(config.dtier1).catch(console.error); }
          if (member.roles.has(config.dtier2)){ member.removeRole(config.dtier2).catch(console.error); }
          if (member.roles.has(config.dtier3)){ member.removeRole(config.dtier3).catch(console.error); }
          m_default.BlankEmbed.BlankEmbed(message, config.embedOkColor, `User **${select.username}** successfully removed from the database!`);
        });
      } else {
        m_default.BlankEmbed.BlankEmbed(message, config.embedERRORColor, `There's no one with that ID in the database!`);
      }
    })
  }
}

module.exports = { DonatorRemove }

// .db [remove] [userid]
