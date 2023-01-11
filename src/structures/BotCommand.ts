import { SlashCommandBuilder, CommandInteraction } from 'discord.js'

export default abstract class BotCommand {
    public readonly name: string
    public readonly json: any

    protected constructor(builder: SlashCommandBuilder) {
        this.json = builder.toJSON()
        this.name = builder.name
    }

    public abstract execute(interaction: CommandInteraction): any
}