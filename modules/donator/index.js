const DonatorShow = require('./show')
const DonatorList = require('./list')
const DonatorAdd = require('./add')
const DonatorRemove = require('./remove')
const DonatorCheck = require('./check')

const DonatorCommands = (client, message, args, command, config, m_db, m_default, moment, m_donator) => {
  const donatorRole = message.guild.roles.get(config.dtier1);
  const adminRole = message.guild.roles.get(config.adminRole);
  var server = message.guild.id;

  if (command === 'donator'){
    if (args[0] == undefined && message.member.roles.has(donatorRole.id)){
      args[1] = message.member.user.id;
      m_donator.DonatorShow.DonatorShow(message, args, config, m_db, moment, server);
    } else if (args[0] == undefined && !message.member.roles.has(donatorRole.id)){
      let noPerms = m_default.BlankEmbed.BlankEmbed(message, config.embedERRORColor, `You're not a Donator!`);
    } else if (args[0] == 'show' && message.member.roles.has(adminRole.id)){
      m_donator.DonatorShow.DonatorShow(message, args, config, m_db, moment, server);
    } else if (args[0] == 'show' && !message.member.roles.has(adminRole.id)){
      let noPerms = m_default.NoPerms.NoPerms(message, config);
    } else if (args[0] == 'list' && message.member.roles.has(adminRole.id)){
      m_donator.DonatorList.DonatorList(message, m_db, m_default, config, moment);
    } else if (args[0] == 'list' && !message.member.roles.has(adminRole.id)){
      let noPerms = m_default.NoPerms.NoPerms(message, config);
    } else if (args[0] == 'add' && message.member.roles.has(adminRole.id)){
      m_donator.DonatorAdd.DonatorAdd(client, message, args, m_db, m_default, config, moment, server);
    } else if (args[0] == 'add' && !message.member.roles.has(adminRole.id)){
      let noPerms = m_default.NoPerms.NoPerms(message, config);
    } else if (args[0] == 'remove' && message.member.roles.has(adminRole.id)){
      m_donator.DonatorRemove.DonatorRemove(message, args, m_db, m_default, config);
    } else if (args[0] == 'remove' && !message.member.roles.has(adminRole.id)){
      let noPerms = m_default.NoPerms.NoPerms(message, config);
    } else {
      m_default.BlankEmbed.BlankEmbed(message, config.embedERRORColor, `Invalid arguments.`)
    }
  }
}

module.exports = { DonatorShow, DonatorList, DonatorAdd, DonatorRemove, DonatorCheck, DonatorCommands }
