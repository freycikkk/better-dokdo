export async function rtt(message, parent) {
    let latencyMessage = "Calculating round-trip time...\n";
    const Calculating = await message.reply(latencyMessage);
    const latencies = [];
    for (let i = 1; i <= 5; i++) {
        const latencyTime = Date.now() - new Date(Calculating.createdAt).getTime();
        latencies.push(latencyTime);
        latencyMessage += `\nReading ${i}: ${latencyTime.toFixed(2)}ms`;
        await Calculating.edit(latencyMessage);
    }
    const averageLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
    const stdDeviation = Math.sqrt(latencies.reduce((sum, val) => sum + Math.pow(val - averageLatency, 2), 0) /
        latencies.length);
    latencyMessage += `\n\nAverage Latency: ${averageLatency.toFixed(2)}ms ± ${stdDeviation.toFixed(2)}ms`;
    latencyMessage += `\nWebsocket Latency: ${parent.client.ws.ping}ms`;
    await Calculating.edit(latencyMessage);
}
//# sourceMappingURL=rtt.js.map