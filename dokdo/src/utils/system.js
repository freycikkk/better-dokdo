/** @format */

export class System {
  static memory() {
    const memory = process.memoryUsage();
    const keys = Object.keys(memory);
    const a = memory;
    keys.forEach((key) => {
      memory[key] = (a[key] / 1024 / 1024).toFixed(2) + 'MB';
    });
    return memory;
  }
  static processReadyAt() {
    return new Date(Date.now() - process.uptime() * 1000);
  }
}
//# sourceMappingURL=system.js.map
