/** @format */

import { Snowflake, Client, Message, User, ChatInputCommandInteraction } from 'discord.js';
import * as Utils from './utils/codeBlock.js';
import * as Commands from './commands/index.js';
export interface DokdoOptions {
  aliases?: string[];
  owners?: Snowflake[];
  prefix?: string;
  secrets?: string[];
  globalVariable?: Record<string, any>;
  disableAttachmentExecution?: boolean;
  noPerm?(context: Message | ChatInputCommandInteraction): Promise<unknown>;
  isOwner?: (user: User) => boolean | Promise<boolean>;
}
export interface MessageData {
  raw: string;
  command: string;
  type: string;
  args?: string;
}
declare module 'discord.js' {
  interface Message {
    data: MessageData;
  }
}
export type Context = ChatInputCommandInteraction | Message;
declare class Dokdo {
  client: Client;
  options: DokdoOptions;
  owners: Snowflake[];
  process: never[];
  constructor(client: Client, options: DokdoOptions);
  run(ctx: Context): Promise<void>;
  _addOwner(id: Snowflake): Snowflake[];
  _removeOwner(id: Snowflake): Snowflake[];
}
export { Dokdo as Client, Utils, Commands };
//# sourceMappingURL=index.d.ts.map
