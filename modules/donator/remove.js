const DonatorRemove = (message, args, m_db, m_default, config) => {
  if (args[1] == undefined){
    m_default.BlankEmbed.BlankEmbed(message, config.embedERRORColor, 'Invalid arguments.');
  } else {
    db.get('SELECT * FROM donators WHERE userid=?', [args[1]], function(err, select){
      if (select !== undefined){
        db.run('DELETE FROM donators WHERE userid=?', [args[1]], function(err, row){
          var guild = message.guild.id;
          var member = guild.members.get(row.userid);
          if (member.roles.has('590384740989796392')){ member.removeRole('590384740989796392').catch(console.error); }
          if (member.roles.has('605482684625453056')){ member.removeRole('605482684625453056').catch(console.error); }
          if (member.roles.has('605482688316440599')){ member.removeRole('605482688316440599').catch(console.error); }
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
