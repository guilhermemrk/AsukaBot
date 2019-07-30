const DonatorList = (ayanami, Discord, message, args, m_db, m_default, config, moment) => {
  let answer = m_default.BlankEmbed.BlankEmbed(ayanami, Discord, config, message, config.embedOkColor, `Database logged to the console.`)
  console.log(`-----------------------------------------------------------------------------------`);
  console.log(`     Logging the database`);
  console.log(`-----------------------------------------------------------------------------------`);
  db.each("SELECT * FROM donators", function(err, row) {
    var a = row.id, b = row.userid, c = row.username, d = row.entryDate, e = row.expireDate, f = row.timeBought, g = row.tier;
    console.log(` ID: ${a} | UserID: ${b} | Username: ${c}`);
    console.log(` Entry Date: ${moment(d).format('DD-MM-YYYY')} | Exp. Date: ${moment(e).format('DD-MM-YYYY')} | Time Bought: ${f} | Tier: ${g}`);
    console.log(`-----------------------------------------------------------------------------------`);
  });
}

module.exports = { DonatorList }
