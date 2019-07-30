const DonatorShow = require('./show')
const DonatorList = require('./list')
const DonatorAdd = require('./add')
const DonatorRemove = require('./remove')
const DonatorCheck = require('./check')

const DonatorCommands = (ayanami, Discord, message, args, command, config, locale, m_db, m_default, moment, m_donator) => {
  const donatorRole = message.guild.roles.get(config.donatorRole);
  const adminRole = message.guild.roles.get(config.adminRole);
  var server = message.guild.id
  if (command === 'donator'){
    if (args[0] == undefined && message.member.roles.has(donatorRole.id)){
      args[1] = message.member.user.id;
      let answer = m_donator.DonatorShow.DonatorShow(ayanami, Discord, message, args, config, locale, m_db, moment);
    } else if (args[0] == undefined && !message.member.roles.has(donatorRole.id)){
      let noPerms = m_default.NoPerms.NoPerms(ayanami, Discord, config, message, locale, m_default);
    } else if (args[0] == 'show'){
      let answer = m_donator.DonatorShow.DonatorShow(ayanami, Discord, message, args, config, locale, m_db, moment, server);
    } else if (args[0] == 'show'){
      let noPerms = m_default.NoPerms.NoPerms(ayanami, Discord, config, message, locale, m_default);
    } else if (args[0] == 'list' && message.member.roles.has(adminRole.id)){
      let answer = m_donator.DonatorList.DonatorList(ayanami, Discord, message, args, m_db, m_default, config, moment);
    } else if (args[0] == 'list' && !message.member.roles.has(adminRole.id)){
      let noPerms = m_default.NoPerms.NoPerms(ayanami, Discord, config, message, locale, m_default);
    } else if (args[0] == 'add'){
      let answer = m_donator.DonatorAdd.DonatorAdd(ayanami, Discord, message, args, m_db, m_default, config, moment, server, donatorRole);
    } else if (args[0] == 'add'){
      let noPerms = m_default.NoPerms.NoPerms(ayanami, Discord, config, message, locale, m_default);
    } else if (args[0] == 'remove' && message.member.roles.has(adminRole.id)){
      let answer = m_donator.DonatorRemove.DonatorRemove(ayanami, Discord, message, args, m_db, m_default, config);
    } else if (args[0] == 'remove' && !message.member.roles.has(adminRole.id)){
      let noPerms = m_default.NoPerms.NoPerms(ayanami, Discord, config, message, locale, m_default);
    } else {
      let invalid = m_default.BlankEmbed.BlankEmbed(ayanami, Discord, config, message, config.embedERRORColor, `Invalid arguments.`)
    }
  }
}

module.exports = { DonatorShow, DonatorList, DonatorAdd, DonatorRemove, DonatorCheck, DonatorCommands }
