const botReady = (client, Discord, m_db, config, m_donator, moment) => {
  client.on('ready', () => {
    const time = 24*60*60*1000; // 24*60*60*1000 -> 1 Day
    m_db.ConnectDB.ConnectDB(config);
    m_db.CreateDB.CreateDB(m_db);
    m_donator.DonatorCheck.DonatorCheck(client, Discord, m_db, moment, config, time);
    console.log(`Bot online!`);
  })
}

module.exports = { botReady }
