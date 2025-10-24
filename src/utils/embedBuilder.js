import { EmbedBuilder } from 'discord.js';
import { getTeamById } from '../config/teams.js';

/**
 * Build welcome embed for new members
 */
export function buildWelcomeEmbed(member, guild) {
  return new EmbedBuilder()
    .setColor('#00ff88')
    .setTitle(`🎉 Welcome to ${guild.name}! 🎉`)
    .setDescription(`
🌟 **Hey ${member}!** Welcome to our amazing community! 🌟

🚀 We're thrilled to have you join us!
✨ Get ready for an incredible journey filled with:
• 💡 Innovation and creativity
• 🤝 Collaboration and teamwork  
• 🎯 Growth and learning opportunities
• 🎊 Fun and exciting experiences

🎯 **Next Step:** Please select your team from the menu below to get started! 👇
    `)
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter({ text: '🎊 Welcome to the team! Let\'s build something amazing together! 🎊' })
    .setTimestamp();
}

/**
 * Build reminder embed for members without team roles
 */
export function buildReminderEmbed(member, guild) {
  return new EmbedBuilder()
    .setColor('#ffcc00')
    .setTitle('⏰ Friendly Reminder: Pick Your Team')
    .setDescription(`
Hey ${member}, we noticed you haven't selected a team yet.

Please choose your team so we can grant you access to the right channels:
• 📱 Mobile • 🌐 Full Stack • 📊 Data Science • 🧪 QA • 🎨 Design
• 👥 HR • 📋 BA • 📈 PMO • 🤝 BD • 💰 Finance

Use the dropdown in this channel to select your team. 🚀
    `)
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter({ text: `Sent by ${guild.name} Assistant • We check every 30 minutes` })
    .setTimestamp();
}

/**
 * Build custom team assignment confirmation embed
 */
export function buildTeamAssignmentEmbed(member, roleId) {
  const team = getTeamById(roleId);
  
  if (!team) {
    return new EmbedBuilder()
      .setColor('#00ff88')
      .setDescription('✅ Role assigned successfully!')
      .setTimestamp();
  }

  return new EmbedBuilder()
    .setColor('#00ff88')
    .setTitle(`${team.emoji} Welcome to ${team.name}!`)
    .setDescription(team.welcomeMessage)
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter({ text: 'This channel will be deleted in a few seconds' })
    .setTimestamp();
}

/**
 * Build statistics embed for admin commands
 */
export function buildStatsEmbed(guild, stats) {
  return new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('📊 Server Statistics')
    .setDescription(`
**Total Members:** ${stats.totalMembers}
**Members with Team Roles:** ${stats.membersWithRoles}
**Members without Team Roles:** ${stats.membersWithoutRoles}
**Bot Members:** ${stats.botMembers}

**Percentage Assigned:** ${stats.assignmentPercentage}%
    `)
    .setFooter({ text: `${guild.name} • Statistics` })
    .setTimestamp();
}
