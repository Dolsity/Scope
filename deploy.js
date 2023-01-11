const discord = require('discord.js');
const config = require('./config.json');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./dist/src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./dist/src/commands/${file}`).default;
	commands.push(command.json);
}

const rest = new discord.REST({ version: '10' }).setToken(config.token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			config.dev ? discord.Routes.applicationGuildCommands(config.clientId, config.guildId) : discord.Routes.applicationCommand(config.clientId, config.guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();