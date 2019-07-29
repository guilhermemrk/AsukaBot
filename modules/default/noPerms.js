const NoPerms = (message, config) => {
    const b_embed = {
      "description": config.noPermissionTo,
      "color": config.embedERRORColor
    }
      message.channel.send({embed: b_embed});
}

module.exports = { NoPerms }
