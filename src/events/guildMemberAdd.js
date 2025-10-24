import { Events, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { findOrCreatePrivateChannel } from '../utils/channelManager.js';
import { buildWelcomeEmbed } from '../utils/embedBuilder.js';
import { getTeamSelectOptions } from '../config/teams.js';

/**
 * Guild member add event handler
 */
export default {
  name: Events.GuildMemberAdd,
  async execute(member, client) {
    try {
      console.log(`👋 ${member.user.tag} joined ${member.guild.name}`);

      // Create private welcome channel
      const channel = await findOrCreatePrivateChannel(member.guild, member, client);

      // Build welcome embed
      const embed = buildWelcomeEmbed(member, member.guild);

      // Create team selection dropdown
      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('team_role_select')
        .setPlaceholder('🏢 Choose your team...')
        .addOptions(getTeamSelectOptions());

      const row = new ActionRowBuilder().addComponents(selectMenu);

      // Send welcome message
      await channel.send({ 
        content: `Welcome ${member}!`, 
        embeds: [embed], 
        components: [row] 
      });

      console.log(`✅ Welcome message sent to ${member.user.tag} in ${channel.name}`);
    } catch (error) {
      console.error(`❌ Failed to handle member join for ${member.user.tag}:`, error);
    }
  },
};
