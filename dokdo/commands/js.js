/** @format */

import { Attachment, ButtonBuilder, ButtonStyle, Collection, Embed, EmbedBuilder, Message } from 'discord.js';
import { ProcessManager, inspect, isGenerator, isInstance } from '../utils';
export async function js(message, parent) {
  const { client } = parent;
  const isMessage = message instanceof Message;
  if (isMessage && !message.data.args) {
    message.reply('Missing Arguments.');
    return;
  }
  const res = new Promise((resolve) => resolve(eval(message.data.args ?? '')));
  let typeOf;
  const result = await res
    .then(async (output) => {
      typeOf = typeof output;
      async function prettify(target) {
        if (target instanceof Embed || target instanceof EmbedBuilder) {
          await message.reply({ embeds: [target] });
        } else if (isInstance(target, Attachment)) {
          await message.reply({
            files: target instanceof Collection ? target.toJSON() : [target]
          });
        }
      }
      if (isGenerator(output)) {
        for (const value of output) {
          prettify(value);
          if (typeof value === 'function') {
            await message.reply(value.toString());
          } else if (typeof value === 'string') await message.reply(value);
          else {
            await message.reply(inspect(value, { depth: 1, maxArrayLength: 200 }));
          }
        }
      }
      prettify(output);
      if (typeof output === 'function') {
        typeOf = 'object';
        return output.toString();
      } else if (typeof output === 'string') {
        return output;
      }
      return inspect(output, { depth: 1, maxArrayLength: 200 });
    })
    .catch((e) => {
      typeOf = 'object';
      return e.toString();
    });
  const msg = new ProcessManager(message, result || '', parent, {
    lang: 'js',
    noCode: typeOf !== 'object'
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
