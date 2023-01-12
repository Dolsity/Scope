import discord from 'discord.js'

export default {
  builder: new discord.SlashCommandBuilder().setName('NAME').setDescription('DESCRIPTION'),
  execute: (async (interaction: discord.CommandInteraction) => {})
}