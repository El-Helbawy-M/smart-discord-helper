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

/**
 * Clean up welcome channels for members who already have roles
 */
export async function cleanupWelcomeChannels(guild, teamRoleIds) {
  console.log(`🧹 Starting cleanup of welcome channels in ${guild.name}...`);
  
  const welcomeChannels = guild.channels.cache.filter(ch => 
    ch.name.startsWith('welcome-') && ch.type === 0 // Only text channels
  );
  
  if (welcomeChannels.size === 0) {
    console.log('✅ No welcome channels found to clean up');
    return;
  }
  
  console.log(`📋 Found ${welcomeChannels.size} welcome channels to check`);
  let deletedCount = 0;
  
  for (const [channelId, channel] of welcomeChannels) {
    try {
      // Extract username from channel name (format: welcome-username)
      const username = channel.name.replace('welcome-', '');
      
      // Find the member by checking permissions on the channel
      const permissions = channel.permissionOverwrites.cache;
      const memberOverwrite = permissions.find(perm => 
        perm.type === 1 && perm.id !== guild.client.user.id
      );
      
      if (!memberOverwrite) {
        console.log(`⚠️ Could not find member for channel: ${channel.name}`);
        continue;
      }
      
      const member = await guild.members.fetch(memberOverwrite.id).catch(() => null);
      
      if (!member) {
        console.log(`⚠️ Member not found in server for channel: ${channel.name}, deleting orphaned channel...`);
        await channel.delete();
        deletedCount++;
        console.log(`🗑️ Deleted orphaned channel: ${channel.name}`);
        continue;
      }
      
      // Check if member has a team role
      if (hasTeamRole(member, teamRoleIds)) {
        await channel.delete();
        deletedCount++;
        console.log(`🗑️ Deleted welcome channel for ${member.user.username} (has team role)`);
      } else {
        console.log(`⏭️ Keeping welcome channel for ${member.user.username} (no team role yet)`);
      }
      
    } catch (error) {
      console.error(`❌ Error processing channel ${channel.name}:`, error.message);
    }
  }
  
  console.log(`✅ Cleanup complete: ${deletedCount} channels deleted`);
}
