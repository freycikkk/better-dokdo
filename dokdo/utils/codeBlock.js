/** @format */

export class codeBlock {
  static construct(content, lang) {
    return `\`\`\`${content ? lang || '' : ''}
${content.replaceAll('```', '\\`\\`\\`')}
\`\`\``;
  }
  static parse(content) {
    const result = content.match(/^```(.*?)\n(.*?)```$/ms);
    return result ? result.slice(0, 3).map((el) => el.trim()) : null;
  }
}
