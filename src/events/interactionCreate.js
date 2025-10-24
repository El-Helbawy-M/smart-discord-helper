import { Events } from 'discord.js';
import { buildTeamAssignmentEmbed } from '../utils/embedBuilder.js';
import { deleteChannelWithDelay } from '../utils/channelManager.js';
import { getTeamById } from '../config/teams.js';

/**
 * Handle team role selection from dropdown menu
 */
async function handleTeamRoleSelect(interaction) {
  try {
    const roleId = interaction.values[0];
    const role = interaction.guild.roles.cache.get(roleId);
    const member = await interaction.guild.members.fetch(interaction.user.id);
    const team = getTeamById(roleId);

    if (!role) {
      return interaction.reply({ 
        content: '❌ Role not found! Please contact an administrator.', 
        ephemeral: true 
      });
    }

    // Assign the role
    await member.roles.add(role);
    console.log(`✅ Assigned ${role.name} to ${member.user.tag}`);

    // Send custom team welcome message
    const embed = buildTeamAssignmentEmbed(member, roleId);
    await interaction.reply({ embeds: [embed] });

    // Schedule channel deletion
    deleteChannelWithDelay(interaction.channel);

  } catch (error) {
    console.error('❌ Failed to assign role:', error);
    await interaction.reply({ 
      content: '⚠️ I could not assign the role. Please contact an administrator.', 
      ephemeral: true 
    });
  }
}

/**
 * Handle slash commands
 */
async function handleSlashCommand(interaction, client) {
  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`⚠️ Command not found: ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(`❌ Error executing command ${interaction.commandName}:`, error);
    
    const errorMessage = { 
      content: '⚠️ There was an error executing this command!', 
      ephemeral: true 
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
}

/**
 * Interaction create event handler
 */
export default {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    // Handle select menu interactions
    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === 'team_role_select') {
        await handleTeamRoleSelect(interaction);
      }
      return;
    }

    // Handle slash commands
    if (interaction.isChatInputCommand()) {
      await handleSlashCommand(interaction, client);
      return;
    }
  },
};
