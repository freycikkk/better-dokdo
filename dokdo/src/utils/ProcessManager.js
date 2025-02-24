import Discord, { ComponentType, Message } from 'discord.js';
import { codeBlock } from './codeBlock.js';
import { regexpEscape } from './regexpEscape.js';
export class ProcessManager {
  content;
  dokdo;
  options;
  target;
  messageContent;
  limit;
  splitted;
  page;
  author;
  actions;
  wait;
  message;
  argument;
  args;
  messageComponentCollector;
  constructor(message, content, dokdo, options = {}) {
    this.content = content;
    this.dokdo = dokdo;
    this.options = options;
    this.target = message.channel;
    this.dokdo = dokdo;
    this.content = content || '​';
    this.messageContent = '';
    this.options = options;
    this.limit = options.limit || 1900;
    this.splitted = this.splitContent() || [' '];
    this.page = 1;
    this.author = message instanceof Message ? message.author : message.user;
    this.actions = [];
    this.wait = 1;
    this.message = undefined;
    this.argument = [];
    if (typeof this.content !== 'string') {
      throw new Error('Please pass valid content');
    }
  }
  async init() {
    this.messageContent = this.genText();
    this.message = await this.target.send(this.filterSecret(this.messageContent));
  }
  async addAction(actions, args) {
    if (!this.message) return;
    this.actions.push(...actions);
    this.args = args || {};
    this.args.manager = this;
    this.createMessageComponentMessage();
    this.messageComponentCollector = this.message.createMessageComponentCollector({
      componentType: ComponentType.Button,
      filter: (interaction) =>
        Boolean(this.actions.find((e) => e.button.data.custom_id === interaction.customId) && interaction.user.id === this.author.id),
      time: 300000,
      dispose: true
    });
    this.messageComponentCollector.on('collect', (component) => {
      const event = this.actions.find((e) => e.button.data.custom_id === component.customId);
      if (!event) return;
      component.deferUpdate();
      event.action(this.args);
    });
    this.messageComponentCollector.on('end', () => {
      this.message?.edit({ components: [] });
    });
  }
  async createMessageComponentMessage() {
    if (this.options.noCode && this.splitted.length < 2) return;
    const buttons = this.actions.filter((el) => !(el.requirePage && this.splitted.length <= 1)).map((el) => el.button);
    if (buttons.length <= 0) return;
    const actionRow = new Discord.ActionRowBuilder({
      components: buttons
    });
    this.message?.edit({ components: [actionRow] });
  }
  filterSecret(string) {
    string = string.replace(new RegExp(this.dokdo.client.token, 'gi'), '[accesstoken was hidden]');
    if (this.dokdo.options.secrets) {
      for (const el of this.dokdo.options.secrets) {
        string = string.replace(new RegExp(regexpEscape(el), 'gi'), '[secret]');
      }
    }
    return string;
  }
  updatePage(num) {
    if (!this.message) return;
    if (this.splitted.length < num || num < 1) throw new Error('Invalid page.');
    this.page = num;
    this.genText();
    this.update();
  }
  nextPage() {
    if (this.page >= this.splitted.length) return;
    this.updatePage(this.page + 1);
  }
  previousPage() {
    if (this.page <= 1) return;
    this.updatePage(this.page - 1);
  }
  update() {
    if (!this.message) return;
    this.splitted = this.splitContent();
    if (this.wait === 0) this.messageContent = this.genText();
    else if (this.wait % 2 === 0) {
      this.wait = 0;
      setTimeout(() => {
        this.messageContent = this.genText();
        this.edit();
        this.wait++;
      }, 1000);
    } else {
      this.messageContent = this.genText();
      this.edit();
      this.wait++;
    }
  }
  edit() {
    if (this.splitted.length > 1) this.createMessageComponentMessage();
    this.message?.edit(this.filterSecret(this.messageContent));
  }
  add(content) {
    if (!this.message) return;
    this.content += content;
    this.update();
  }
  destroy() {
    this.message?.edit({ components: [] });
    this.messageComponentCollector?.stop();
  }
  genText() {
    return this.options.noCode && this.splitted.length < 2
      ? `${this.splitted[this.page - 1]}`
      : `${codeBlock.construct(this.splitted[this.page - 1], this.options.lang)}\n\nPage ${this.page}/${this.splitted.length}`;
  }
  splitContent() {
    const char = [new RegExp(`.{1,${this.limit}}`, 'g'), '\n'];
    const text = Discord.verifyString(this.content);
    if (text.length <= this.limit) return [text];
    let splitText = [text];
    while (char.length > 0 && splitText.some((elem) => elem.length > this.limit)) {
      const currentChar = char.shift();
      if (currentChar instanceof RegExp) {
        splitText = splitText.flatMap((chunk) => chunk.match(currentChar)).filter((value) => value !== null);
      } else {
        splitText = splitText.flatMap((chunk) => chunk.split(currentChar));
      }
    }
    if (splitText.some((elem) => elem.length > this.limit)) {
      throw new RangeError('SPLIT_MAX_LEN');
    }
    const messages = [];
    let msg = '';
    for (const chunk of splitText) {
      if (msg && (msg + char + chunk).length > this.limit) {
        messages.push(msg);
        msg = '';
      }
      msg += (msg && msg !== '' ? char : '') + chunk;
    }
    return messages.concat(msg).filter((m) => m);
  }
}
//# sourceMappingURL=ProcessManager.js.map
