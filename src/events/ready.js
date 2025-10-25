import { Events, REST, Routes } from 'discord.js';
import { BOT_CONFIG } from '../config/bot.js';
import { TEAM_ROLE_IDS } from '../config/teams.js';
import { hasTeamRole, findOrCreatePrivateChannel, cleanupWelcomeChannels } from '../utils/channelManager.js';
import { buildReminderEmbed } from '../utils/embedBuilder.js';
import { getTeamSelectOptions } from '../config/teams.js';
import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { commands } from '../commands/index.js';

/**
 * Send reminder to a member without a team role
 */
async function sendReminder(guild, member, client) {
  try {
    const channel = await findOrCreatePrivateChannel(guild, member, client);
    const embed = buildReminderEmbed(member, guild);

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('team_role_select')
      .setPlaceholder('🏢 Choose your team...')
      .addOptions(getTeamSelectOptions());

    const row = new ActionRowBuilder().addComponents(selectMenu);
    await channel.send({ content: `👋 Hello ${member}!`, embeds: [embed], components: [row] });
    
    console.log(`📨 Sent reminder to ${member.user.tag}`);
  } catch (error) {
    console.error(`❌ Failed to send reminder to ${member.user.tag}:`, error.message);
  }
}

/**
 * Start the scheduler that checks for members without team roles
 */
function startRoleCheckScheduler(client) {
  const runCheck = async () => {
    try {
      console.log('🔍 Starting role check...');
      let reminderCount = 0;

      for (const [, guild] of client.guilds.cache) {
        await guild.members.fetch();
        
        for (const [, member] of guild.members.cache) {
          if (member.user.bot) continue;
          if (hasTeamRole(member, TEAM_ROLE_IDS)) continue;
          
          await sendReminder(guild, member, client);
          reminderCount++;
        }
      }
      
      console.log(`✅ Role check completed. Sent ${reminderCount} reminder(s).`);
    } catch (err) {
      console.error('❌ Role check failed:', err);
    }
  };

  // Run immediately on startup, then at regular intervals
  runCheck();
  setInterval(runCheck, BOT_CONFIG.ROLE_CHECK_INTERVAL);
  
  console.log(`⏰ Role check scheduler started (interval: ${BOT_CONFIG.ROLE_CHECK_INTERVAL / 60000} minutes)`);
}

/**
 * Start the scheduler that cleans up welcome channels
 */
function startCleanupScheduler(client) {
  const runCleanup = async () => {
    try {
      console.log('🧹 Starting welcome channel cleanup...');
      
      for (const [, guild] of client.guilds.cache) {
        await cleanupWelcomeChannels(guild, TEAM_ROLE_IDS);
      }
      
      console.log('✅ Welcome channel cleanup completed');
    } catch (err) {
      console.error('❌ Cleanup failed:', err);
    }
  };

  // Run immediately on startup, then every 24 hours
  runCleanup();
  setInterval(runCleanup, BOT_CONFIG.CLEANUP_CHECK_INTERVAL);
  
  console.log(`⏰ Cleanup scheduler started (interval: ${BOT_CONFIG.CLEANUP_CHECK_INTERVAL / 3600000} hours)`);
}

/**
 * Register slash commands with Discord
 */
async function registerSlashCommands(client) {
  try {
    console.log('🔄 Registering slash commands...');
    
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands.map(cmd => cmd.data.toJSON()) }
    );
    
    console.log('✅ Slash commands registered successfully');
  } catch (error) {
    console.error('❌ Failed to register slash commands:', error);
  }
}

/**
 * Ready event handler
 */
export default {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`✅ Logged in as ${client.user.tag}`);
    console.log(`🤖 Bot is active in ${client.guilds.cache.size} server(s)`);
    
    // Register slash commands
    await registerSlashCommands(client);
    
    // Start the role check scheduler
    startRoleCheckScheduler(client);
    
    // Start the cleanup scheduler
    startCleanupScheduler(client);
    
    console.log('🚀 Bot is ready!');
  },
};
