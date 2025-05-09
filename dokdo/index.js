/** @format */

import { Client, Message, User } from 'discord.js';
import fetch from 'node-fetch';
import * as Commands from './commands';
import { cat, curl, exec, js, jsi, main, rtt, shard } from './commands';
import * as Utils from './utils';
class Dokdo {
  client;
  options;
  owners;
  process;
  constructor(client, options) {
    this.client = client;
    this.options = options;
    if (!(client instanceof Client)) {
      throw new TypeError('Invalid `client`. `client` parameter is required.');
    }
    if (options.noPerm && typeof options.noPerm !== 'function') {
      throw new Error('`noPerm` parameter must be Function.');
    }
    if (options.globalVariable) {
      if (typeof options.globalVariable !== 'object') {
        throw new Error('`globalVariable` parameter must be Object.');
      } else {
        Object.keys(options.globalVariable).forEach((el) => {
          if (options.globalVariable) global[el] = options.globalVariable[el];
        });
      }
    }
    if (options.isOwner && !options.owners) options.owners = [];
    this.owners = options.owners || [];
    if (!this.options.secrets || !Array.isArray(this.options.secrets)) {
      this.options.secrets = [];
    }
    if (!this.options.aliases) this.options.aliases = ['dokdo', 'dok'];
    this.process = [];
    client.once('ready', (client) => {
      if (!this.owners.length) {
        console.warn('[ Dokdo ] Owners not given. Fetching from Application.');
        client.application.fetch().then((data) => {
          if (!data.owner) {
            return console.warn('[ Dokdo ] Falied to owner data.');
          }
          if (data.owner instanceof User) {
            return this.owners.push(data.owner.id);
          }
          this.owners = data.owner.members?.map((el) => el.id);
          console.info(
            `[ Dokdo ] Fetched ${this.owners.length} owner(s): ${this.owners.length > 3 ? this.owners.slice(0, 3).join(', ') + ` and ${this.owners.length - 3} more owners` : this.owners.join(', ')}`
          );
        });
      }
    });
  }
  async run(ctx) {
    if (ctx instanceof Message) {
      if (!this.options.prefix) return;
      if (!ctx.content.startsWith(this.options.prefix)) return;
      const parsed = ctx.content.replace(this.options.prefix, '').split(' ');
      const codeParsed = Utils.codeBlock.parse(parsed.slice(2).join(' '));
      ctx.data = {
        raw: ctx.content,
        command: parsed[0],
        type: parsed[1],
        args: codeParsed ? codeParsed[2] : parsed.slice(2).join(' ')
      };
      if (!ctx.data.args && ctx.attachments.size > 0 && !this.options.disableAttachmentExecution) {
        const file = ctx.attachments.first();
        if (!file) return;
        const buffer = await (await fetch(file.url)).buffer();
        const type = { ext: file.name?.split('.').pop(), fileName: file.name };
        if (['txt', 'js', 'ts', 'sh', 'bash', 'zsh', 'ps'].includes(type.ext)) {
          ctx.data.args = buffer.toString();
          if (!ctx.data.type && type.ext !== 'txt') ctx.data.type = type.ext;
        }
      }
      if (this.options.aliases && !this.options.aliases.includes(ctx.data.command)) {
        return;
      }
      if (!this.owners.includes(ctx.author.id)) {
        let isOwner = false;
        if (this.options.isOwner) {
          isOwner = await this.options.isOwner(ctx.author);
        }
        if (!isOwner) {
          if (this.options.noPerm) this.options.noPerm(ctx);
          return;
        }
      }
      if (!ctx.data.type) return main(ctx, this);
      switch (ctx.data.type) {
        case 'sh':
        case 'bash':
        case 'ps':
        case 'powershell':
        case 'shell':
        case 'zsh':
        case 'exec':
          exec(ctx, this);
          break;
        case 'js':
        case 'javascript':
          js(ctx, this);
          break;
        case 'rtt':
          rtt(ctx, this);
          break;
        case 'shard':
          shard(ctx, this);
          break;
        case 'jsi':
          jsi(ctx, this);
          break;
        case 'curl':
          curl(ctx, this);
          break;
        case 'cat':
          cat(ctx, this);
          break;
        default:
          ctx.reply(
            `Available Options: ${Object.keys(Commands)
              .filter((t) => t !== 'main')
              .map((t) => `\`${t}\``)
              .join(', ')}`
          );
      }
    }
  }
  _addOwner(id) {
    if (!this.owners.includes(id)) this.owners.push(id);
    return this.owners;
  }
  _removeOwner(id) {
    if (this.owners.includes(id)) this.owners.splice(this.owners.indexOf(id), 1);
    return this.owners;
  }
}
export { Dokdo as Client, Commands, Utils };
