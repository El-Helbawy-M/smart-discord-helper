import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import { BOT_CONFIG } from '../config/bot.js';

export default {
  data: new SlashCommandBuilder()
    .setName('config')
    .setDescription('View bot configuration settings')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('⚙️ Bot Configuration')
      .setDescription('Current bot settings and configuration')
      .addFields(
        { 
          name: '⏰ Role Check Interval', 
          value: `${BOT_CONFIG.ROLE_CHECK_INTERVAL / 60000} minutes`,
          inline: true 
        },
        { 
          name: '🗑️ Auto-Delete Channels', 
          value: BOT_CONFIG.AUTO_DELETE_CHANNELS ? '✅ Enabled' : '❌ Disabled',
          inline: true 
        },
        { 
          name: '⏱️ Channel Delete Delay', 
          value: `${BOT_CONFIG.CHANNEL_DELETE_DELAY / 1000} seconds`,
          inline: true 
        }
      )
      .setFooter({ text: 'To modify these settings, edit src/config/bot.js' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
    console.log(`⚙️ Config command executed by ${interaction.user.tag}`);
  },
};
