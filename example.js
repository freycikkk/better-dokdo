/** @format */

import { Client, GatewayIntents } from 'discord.js';
import { Client as DokdoClient } from './dokdo/index.js';

const client = new Client({
  intents: [GatewayIntents.Guilds, GatewayIntents.GuildMessages]
});

const Dokdo = new DokdoClient(client, {
  aliases: ['dokdo', 'dok', 'jsk'],
  prefix: '!',
  owners: '123456789012345678'
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on('messageCreate', async (message) => {
  await Dokdo.handleMessage(message);
});

client.login('TOKEN');
