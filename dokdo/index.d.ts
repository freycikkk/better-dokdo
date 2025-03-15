/** @format */

import { ClusterClient } from 'discord-hybrid-sharding';
import { ChatInputCommandInteraction, Client, Message, Snowflake, User } from 'discord.js';
import * as Commands from './commands';
import * as Utils from './utils';
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
export type Context = Message<true>;
declare class Dokdo {
  client: Client & {
    cluster: ClusterClient;
  };
  options: DokdoOptions;
  owners: Snowflake[];
  process: never[];
  constructor(
    client: Client & {
      cluster: ClusterClient;
    },
    options: DokdoOptions
  );
  run(ctx: Context): Promise<void>;
  _addOwner(id: Snowflake): Snowflake[];
  _removeOwner(id: Snowflake): Snowflake[];
}
export { Dokdo as Client, Commands, Utils };
