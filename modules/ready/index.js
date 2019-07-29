const botReady = (client, Discord, m_db, config, m_donator, moment) => {
  client.on('ready', () => {
    m_db.ConnectDB.ConnectDB(config);
    m_db.CreateDB.CreateDB(m_db);
    m_donator.DonatorCheck.DonatorCheck(client, Discord, m_db, moment);
    console.log(`Bot online!`);
  })
}

module.exports = { botReady }
