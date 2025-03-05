/** @format */

import { ButtonBuilder, ButtonStyle } from 'discord.js';
import { inspect } from '../utils/inspect.js';
import { ProcessManager } from '../utils/ProcessManager.js';
export async function shard(message, parent) {
  if (!message.data.args) {
    message.reply('Missing Arguments.');
    return;
  }
  if (!parent.client.shard && !parent.client.cluster) {
    message.reply('Shard or Cluster Manager not found.');
    return;
  }
  let evalFunction;
  try {
    evalFunction = Function('client', `return ${message.data.args}`);
  } catch (err) {
    message.reply(err?.toString() ?? 'Error Occurred.');
    return;
  }
  const isHybrid = Boolean(parent.client.cluster);
  const evalMethod = isHybrid ? parent.client.cluster?.broadcastEval(evalFunction) : parent.client.shard.broadcastEval(evalFunction);
  const result = await evalMethod?.catch((e) => e.toString());
  let msg;
  if (!Array.isArray(result)) {
    msg = new ProcessManager(message, result, parent, { lang: 'js' });
  } else {
    let sum;
    if (typeof result[0] === 'number') {
      sum = result.reduce((prev, val) => prev + val, 0);
    } else if (Array.isArray(result[0])) {
      sum = result.reduce((prev, val) => prev.concat(val), []);
    }
    msg = new ProcessManager(
      message,
      `// TOTAL\n${inspect(sum, { depth: 1, maxArrayLength: 50 })}\n\n${result
        .map(
          (value, index) =>
            `// #${index} ${isHybrid ? 'CLUSTER' : 'SHARD'}\n${inspect(value, {
              depth: 1,
              maxArrayLength: 100
            })}`
        )
        .join('\n')}`,
      parent,
      { lang: 'js' }
    );
  }
  await msg.init();
  await msg.addAction([
    {
      button: new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId('dokdo$prev').setLabel('Prev'),
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
//# sourceMappingURL=shard.js.map
