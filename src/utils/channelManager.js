import { PermissionsBitField } from 'discord.js';
import { BOT_CONFIG } from '../config/bot.js';

/**
 * Find or create a private welcome channel for a member
 */
export async function findOrCreatePrivateChannel(guild, member, client) {
  const channelName = `welcome-${member.user.username.toLowerCase()}`;
  let channel = guild.channels.cache.find(ch => ch.name === channelName);
  
  if (channel) {
    console.log(`📝 Found existing channel: ${channelName}`);
    return channel;
  }

  console.log(`🆕 Creating new channel: ${channelName}`);
  channel = await guild.channels.create({
    name: channelName,
    type: 0, // text channel
    permissionOverwrites: [
      {
        id: guild.id, // @everyone
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
      {
        id: member.user.id, // member
        allow: [
          PermissionsBitField.Flags.ViewChannel,
          PermissionsBitField.Flags.SendMessages,
          PermissionsBitField.Flags.ReadMessageHistory,
        ],
      },
      {
        id: client.user.id, // bot
        allow: [
          PermissionsBitField.Flags.ViewChannel,
          PermissionsBitField.Flags.SendMessages,
          PermissionsBitField.Flags.ManageChannels,
        ],
      },
    ],
  });

  return channel;
}

/**
 * Delete a channel after a delay (for auto-cleanup)
 */
export async function deleteChannelWithDelay(channel, delay = BOT_CONFIG.CHANNEL_DELETE_DELAY) {
  if (!BOT_CONFIG.AUTO_DELETE_CHANNELS) {
    console.log(`⏭️ Auto-delete disabled for channel: ${channel.name}`);
    return;
  }

  console.log(`⏰ Scheduling deletion of ${channel.name} in ${delay / 1000} seconds...`);
  
  setTimeout(async () => {
    try {
      await channel.delete();
      console.log(`🗑️ Successfully deleted channel: ${channel.name}`);
    } catch (error) {
      console.error(`❌ Failed to delete channel ${channel.name}:`, error.message);
    }
  }, delay);
}

/**
 * Check if member has any team role
 */
export function hasTeamRole(member, teamRoleIds) {
  return member.roles.cache.some(r => teamRoleIds.includes(r.id));
}
