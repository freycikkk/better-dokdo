import { GatewayIntentBits, IntentsBitField, version as djsVersion } from 'discord.js';
import { System } from '../utils/system.js';
import { DateFormatting } from '../utils/DateFormatting.js';
import { join } from '../utils/join.js';
import packageJson from '../../../package.json' with { type: 'json' };
const { version } = packageJson;
export async function main(message, parent) {
  const intents = new IntentsBitField(parent.client.options.intents);
  let summary = `${parent.client.user.username} v${version}, discord.js \`${djsVersion}\`, \`Node.js ${process.version}\` on \`${process.platform}\`\nProcess started at ${DateFormatting.relative(System.processReadyAt())}, bot was ready at ${DateFormatting.relative(parent.client.readyAt ?? 0)}.\n`;
  summary += `\nUsing ${System.memory().rss} at this process.\n`;
  const cache = `${parent.client.guilds.cache.size} guild(s) and ${parent.client.users.cache.size} user(s)`;
  if (parent.client.shard) {
    const guilds = await parent.client.shard.fetchClientValues('guilds.cache.size').then((r) => {
      const out = r;
      out.reduce((prev, val) => prev + val, 0);
    });
    summary += `Running on PID ${process.pid} for this client, and running on PID ${process.ppid} for the parent process.\n\nThis bot is sharded in ${parent.client.shard.count} shard(s) and running in ${guilds} guild(s).\nCan see ${cache} in this client.`;
  } else {
    summary += `Running on PID ${process.pid}\n\nThis bot is not sharded and can see ${cache}.`;
  }
  summary +=
    '\n' +
    join(
      [GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent].map(
        (u) => `\`${GatewayIntentBits[u]}\` intent is ${intents.has(u) ? 'enabled' : 'disabled'}`
      ),
      ', ',
      ' and '
    ) +
    '.';
  summary += `\nAverage websocket latency: ${parent.client.ws.ping}ms`;
  message.reply(summary);
}
//# sourceMappingURL=main.js.map
