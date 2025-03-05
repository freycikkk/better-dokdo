/** @format */

import fetch from 'axios';
import { ButtonBuilder, ButtonStyle } from 'discord.js';
import { ProcessManager } from '../utils/ProcessManager.js';
import { HLJS } from '../utils/hljs.js';
export async function curl(message, parent) {
  if (!message.data.args) {
    message.reply('Missing Arguments.');
    return;
  }
  let type;
  const res = await fetch(message.data.args.split(' ')[0])
    .then(async (r) => {
      const text = await r.text();
      try {
        type = 'json';
        return JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        type = HLJS.getLang(r.headers.get('Content-Type')) || 'html';
        return text;
      }
    })
    .catch((e) => {
      type = 'js';
      message.react('❗');
      console.log(e.stack);
      return e.toString();
    });
  const msg = new ProcessManager(message, res || '', parent, { lang: type });
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
//# sourceMappingURL=curl.js.map
