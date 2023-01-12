import { Client, GatewayIntentBits, Events, Collection, ActivityType } from 'discord.js'
import { token, mongo } from '../config.json'
import BotCommand from './structures/BotCommand'
import fs from 'node:fs'
import mongoose from 'mongoose'

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ]
})

const commands: Collection<string, BotCommand> = new Collection()

const commandFiles = fs.readdirSync(__dirname+'/commands/')
commandFiles.forEach((async (fileName: string) => {
    const command = (await import(`${__dirname}/commands/${fileName}`)).default as BotCommand
    commands.set(command.name, command)
}))

client.on(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user?.tag}`)
    client.user?.setActivity({
        name: client.user.username,
        type: ActivityType.Playing
    })
})

process.on('uncaughtException', (err) => console.log(`[CRASH PREVENTION - EXCEPTION]\n${err.stack}`))
process.on('unhandledRejection', (err) => console.log(`[CRASH PREVENTION - REJECTION]\n${err}`))

client.login(token)
mongoose.connect(mongo).then(() => console.log('Database connected.'))