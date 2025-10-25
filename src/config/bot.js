export const BOT_CONFIG = {
  // How often to check for members without team roles (in milliseconds)
  ROLE_CHECK_INTERVAL: 30 * 60 * 1000, // 30 minutes
  
  // How long to wait before auto-deleting welcome channel after role assignment (in milliseconds)
  CHANNEL_DELETE_DELAY: 10000, // 10 seconds
  
  // Enable/disable auto-deletion of welcome channels
  AUTO_DELETE_CHANNELS: true,
  
  // How often to clean up orphaned welcome channels (in milliseconds)
  CLEANUP_CHECK_INTERVAL: 24 * 60 * 60 * 1000, // 24 hours
};

export const INTENTS = {
  GUILDS: 1,
  GUILD_MEMBERS: 2,
  GUILD_MESSAGES: 4,
};
