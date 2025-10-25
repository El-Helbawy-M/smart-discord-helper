import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// Load environment variables
dotenv.config();

// Validate environment variables
if (!process.env.TOKEN) {
  console.error('❌ Error: TOKEN not found in environment variables!');
  process.exit(1);
}

console.log('✅ Environment variables loaded successfully');

// Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
  partials: [Partials.GuildMember],
});

// Initialize commands collection
client.commands = new Collection();

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load commands
const commandsPath = path.join(__dirname, 'src', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js') && file !== 'index.js');

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const fileUrl = pathToFileURL(filePath).href;
  
  try {
    const command = await import(fileUrl);
    
    if (command.default && 'data' in command.default && 'execute' in command.default) {
      client.commands.set(command.default.data.name, command.default);
      console.log(`📝 Loaded command: ${command.default.data.name}`);
    } else {
      console.warn(`⚠️ Command at ${file} is missing required "data" or "execute" property`);
    }
  } catch (error) {
    console.error(`❌ Error loading command ${file}:`, error);
  }
}

// Load events
const eventsPath = path.join(__dirname, 'src', 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const fileUrl = pathToFileURL(filePath).href;
  
  try {
    const event = await import(fileUrl);
    
    if (event.default && 'name' in event.default && 'execute' in event.default) {
      if (event.default.once) {
        client.once(event.default.name, (...args) => event.default.execute(...args, client));
      } else {
        client.on(event.default.name, (...args) => event.default.execute(...args, client));
      }
      console.log(`📅 Loaded event: ${event.default.name}`);
    } else {
      console.warn(`⚠️ Event at ${file} is missing required "name" or "execute" property`);
    }
  } catch (error) {
    console.error(`❌ Error loading event ${file}:`, error);
  }
}

// Handle process errors
process.on('unhandledRejection', error => {
  console.error('❌ Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
  console.error('❌ Uncaught exception:', error);
  process.exit(1);
});

// Login to Discord
console.log('🔄 Logging in to Discord...');
client.login(process.env.TOKEN);
