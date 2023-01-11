import discord from 'discord.js'

export default {
  builder: new discord.SlashCommandBuilder().setName('name').setDescription('description'),
  execute: (async (interaction: discord.CommandInteraction) => {})
}