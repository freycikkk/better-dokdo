/** @format */

import { ButtonBuilder, ButtonStyle, Collection } from 'discord.js';
import { ProcessManager, count, inspect, table, typeFind } from '../utils';
export async function jsi(message, parent) {
  const { client } = parent;
  if (!message.data.args) {
    message.reply('Missing Arguments.');
    return;
  }
  const res = new Promise((resolve) => resolve(eval(message.data.args ?? '')));
  let msg;
  await res
    .then((output) => {
      const typeofTheRes = typeFind(output);
      const overview = inspect(output, { depth: -1 });
      const constructorName = output && output.constructor ? Object.getPrototypeOf(output.constructor).name : null;
      const arrCount = count(output);
      msg = new ProcessManager(
        message,
        `=== ${overview.slice(0, 100)}${overview.length > 100 ? '...' : ''} ===\n\n${table({
          Type: `${typeof output}(${typeofTheRes})`,
          Name: constructorName || null,
          Length: typeof output === 'string' && output.length,
          Size: output instanceof Collection ? output.size : null,
          'Content Types': arrCount ? arrCount.map((el) => `${el.name} (${el.ratio}％)`).join(', ') : null
        })}`,
        parent,
        { lang: 'prolog' }
      );
    })
    .catch((e) => {
      msg = new ProcessManager(message, e.stack, parent, { lang: 'js' });
    });
  await msg.init();
  await msg.addAction([
    {
      button: new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId('dokdo$prev').setLabel('Prev'),
      action: ({ manager }) => manager.previousPage(),
      requirePage: true
    },
    {
      button: new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('dokdo$stop').setLabel('Stop'),
      action: ({ manager }) => manager.destroy(),
      requirePage: true
    },
    {
      button: new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId('dokdo$next').setLabel('Next'),
      action: ({ manager }) => manager.nextPage(),
      requirePage: true
    }
  ]);
}
