const DonatorRemove = (ayanami, Discord, message, args, m_db, m_default, config) => {
  if (args[1] == undefined){
    let answer = m_default.BlankEmbed.BlankEmbed(ayanami, Discord, config, message, config.embedERRORColor, 'Invalid arguments.');
  } else {
    db.get('SELECT * FROM donators WHERE userid=?', [args[1]], function(err, row){
      username = row.username
      if (row !== undefined){
        db.run('DELETE FROM donators WHERE userid=?', [args[1]], function(err, row){
          let answer = m_default.BlankEmbed.BlankEmbed(ayanami, Discord, config, message, config.embedOkColor, `User **${username}** successfully removed from the database!`);
        });
      } else {
        let answer = m_default.BlankEmbed.BlankEmbed(ayanami, Discord, config, message, config.embedERRORColor, `There's no one with that ID in the database!`);
      }
    })
  }
}

module.exports = { DonatorRemove }

// .db [remove] [userid]
