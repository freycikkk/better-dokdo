<!-- @format -->

# Dokdo - Easy JavaScript/TypeScript Debugging

This is a custom implementation of Dokdo, a powerful debugging tool for Discord bot developers. Unlike traditional Dokdo packages, you don't need to install it separately. Just copy and paste the `dokdo` folder into your project, adjust the imports, set up the Dokdo client, and you're good to go!

## Features

- No installation required – just copy the `dokdo` folder.
- Works seamlessly with both JavaScript and TypeScript.
- Optimized for performance and ease of use.
- Simple command execution with customizable prefixes and aliases.

## Installation

### Step 1: Copy the Dokdo Folder

Download or copy the `dokdo` folder and place it inside your project directory.

### Step 2: Adjust Imports

Modify the import path to ensure it correctly references the `path/to/dokdo/index.js` file:

```javascript
import { Client as DokdoClient } from './dokdo/index.js'; // You can import Client normally just make sure it doesn't interfere with discord.js Client
```

### Step 3: Setup the Dokdo Client

Initialize your Discord bot and Dokdo client as shown below:

```javascript
const client = new Client({
  intents: [GatewayIntents.Guilds, GatewayIntents.GuildMessages]
});

const Dokdo = new DokdoClient(client, {
  aliases: ['dokdo', 'dok', 'jsk'], // Replace with your desired aliases
  prefix: '!', // Replace with your desired prefix
  owners: '123456789012345678' // Replace with your Discord user ID
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on('messageCreate', async (message) => {
  await Dokdo.handleMessage(message);
});

client.login('TOKEN'); // Replace with your bot token
```

## Usage

Once set up, you can use Dokdo commands in your Discord server:

```
!dokdo js 1+1  // Executes JavaScript code
!dok sh console.log("Hello")  // Logs output
!jsk js message.guild.id  // Evaluates expressions
```

## Why Use This Dokdo?

- **No need to install a package** – just copy and paste.
- **Better performance** – optimized for efficiency.
- **Flexibility** – works in both JS and TS environments.
- **Easy setup** – minimal configuration required.

With this version of Dokdo, debugging and executing code in your Discord bot has never been easier! 🚀

⚠️ **Notice**: This project is based on the original code from [wonderlandpark/dokdo](https://github.com/wonderlandpark/dokdo). I made a few adjustments and improvements to better fit my use case and decided to share it publicly in case it helps others too. Full credit to the original author.
