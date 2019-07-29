const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require("moment");
var modules = require('./modules');
const config = require("./src/config.json");

const prefix = config.prefix;

var m_login = modules.m_login;
var m_ready = modules.m_ready;
var m_db = modules.m_db;
var m_default = modules.m_default;
var m_donator = modules.m_donator;

m_ready.botReady(client, Discord, m_db, config, m_donator, moment);

client.on('message', message => {
  var args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0);
  m_donator.DonatorCommands(client, message, args, command, config, m_db, m_default, moment, m_donator);
})

m_login.botLogin(config.token, client, Discord);
