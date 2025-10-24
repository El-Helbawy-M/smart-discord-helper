import { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { TEAM_ROLE_IDS, getTeamSelectOptions } from '../config/teams.js';
import { hasTeamRole, findOrCreatePrivateChannel } from '../utils/channelManager.js';
import { buildReminderEmbed } from '../utils/embedBuilder.js';

export default {
  data: new SlashCommandBuilder()
    .setName('remind')
    .setDescription('Manually send reminders to members without team roles')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });

    try {
      const guild = interaction.guild;
      await guild.members.fetch();

      let reminderCount = 0;

      for (const [, member] of guild.members.cache) {
        if (member.user.bot) continue;
        if (hasTeamRole(member, TEAM_ROLE_IDS)) continue;

        // Send reminder
        const channel = await findOrCreatePrivateChannel(guild, member, client);
        const embed = buildReminderEmbed(member, guild);

        const selectMenu = new StringSelectMenuBuilder()
          .setCustomId('team_role_select')
          .setPlaceholder('🏢 Choose your team...')
          .addOptions(getTeamSelectOptions());

        const row = new ActionRowBuilder().addComponents(selectMenu);
        await channel.send({ content: `👋 Hello ${member}!`, embeds: [embed], components: [row] });

        reminderCount++;
      }

      await interaction.editReply({ 
        content: `✅ Sent reminders to **${reminderCount}** member(s) without team roles.` 
      });

      console.log(`📨 Remind command executed by ${interaction.user.tag} - ${reminderCount} reminders sent`);
    } catch (error) {
      console.error('❌ Error in remind command:', error);
      await interaction.editReply({ 
        content: '⚠️ Failed to send reminders. Please try again later.' 
      });
    }
  },
};
