/** @format */

import { ButtonBuilder, ButtonInteraction, InteractionCollector, Message, TextBasedChannel, User } from 'discord.js';
import type { Client, Context } from '../';
export interface ProcessOptions {
  limit?: number;
  noCode?: boolean;
  secrets?: string[];
  lang?: string;
}
export interface ActionOptions {
  manager: ProcessManager;
  [x: string]: any;
}
export interface Action {
  button: ButtonBuilder;
  requirePage: boolean;
  action(options: ActionOptions): Promise<any> | any;
}
export declare class ProcessManager {
  content: string;
  dokdo: Client;
  options: ProcessOptions;
  target: TextBasedChannel;
  messageContent: string;
  limit: number;
  splitted: string[];
  page: number;
  author: User;
  actions: Action[];
  wait: number;
  message?: Message;
  argument: never[];
  args: any;
  messageComponentCollector: InteractionCollector<ButtonInteraction> | undefined;
  constructor(message: Context, content: string, dokdo: Client, options?: ProcessOptions);
  init(): Promise<void>;
  addAction(actions: Action[], args?: Record<string, unknown>): Promise<void>;
  createMessageComponentMessage(): Promise<void>;
  filterSecret(string: string): string;
  updatePage(num: number): void;
  nextPage(): void;
  previousPage(): void;
  update(): void;
  edit(): void;
  add(content: string): void;
  destroy(): void;
  genText(): string;
  splitContent(): string[];
}
