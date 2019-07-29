const BlankEmbed = (message, ecolor, be_content) => {
  const b_embed = {
    "description": be_content,
    "color": ecolor
  }
    message.channel.send({embed: b_embed});
}

module.exports = { BlankEmbed }
