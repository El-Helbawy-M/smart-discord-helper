import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { TEAM_ROLE_IDS } from '../config/teams.js';
import { hasTeamRole } from '../utils/channelManager.js';
import { buildStatsEmbed } from '../utils/embedBuilder.js';

export default {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('View server statistics and team role assignment status')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    try {
      const guild = interaction.guild;
      await guild.members.fetch();

      let totalMembers = 0;
      let membersWithRoles = 0;
      let membersWithoutRoles = 0;
      let botMembers = 0;

      for (const [, member] of guild.members.cache) {
        if (member.user.bot) {
          botMembers++;
          continue;
        }
        
        totalMembers++;
        
        if (hasTeamRole(member, TEAM_ROLE_IDS)) {
          membersWithRoles++;
        } else {
          membersWithoutRoles++;
        }
      }

      const assignmentPercentage = totalMembers > 0 
        ? Math.round((membersWithRoles / totalMembers) * 100) 
        : 0;

      const stats = {
        totalMembers,
        membersWithRoles,
        membersWithoutRoles,
        botMembers,
        assignmentPercentage,
      };

      const embed = buildStatsEmbed(guild, stats);
      await interaction.editReply({ embeds: [embed] });

      console.log(`📊 Stats command executed by ${interaction.user.tag}`);
    } catch (error) {
      console.error('❌ Error in stats command:', error);
      await interaction.editReply({ 
        content: '⚠️ Failed to fetch statistics. Please try again later.' 
      });
    }
  },
};
